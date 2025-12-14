import { useState } from 'react';
import { usePosts } from '../../hooks/usePosts';
import CreatePost from '../../components/Post/CreatePost/CreatePost';
import Post from '../../components/Post/Post';
import styles from './Home.module.css';
import { useAuth } from "../../hooks/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const { posts, loading, error, createPost, likePost, addComment } = usePosts();
  const [activeTab, setActiveTab] = useState('all'); 


  const filteredPosts = activeTab === 'my' 
    ? posts.filter(post => post.userId === user.id)
    : posts;

  const handleCreatePost = async (postData) => {
    return await createPost(postData);
  };

  const handleLikePost = async (postId) => {
    return await likePost(postId, user.id);
  };

  const handleAddComment = async (postId, content) => {
    const commentData = {
      userId: user.id,
      username: user.username,
      content: content
    };
    return await addComment(postId, commentData);
  };

  if (loading && posts.length === 0) {
    return <div className={styles.loading}>Завантаження постів...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.newsFeed}>
        <div className={styles.header}>
          <h2>Стрічка новин</h2>
          <div className={styles.tabs}>
            <button 
              className={activeTab === 'all' ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab('all')}
            >
              Всі пости
            </button>
            <button 
              className={activeTab === 'my' ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab('my')}
            >
              Мої пости
            </button>
          </div>
        </div>


        <CreatePost user={user} onCreatePost={handleCreatePost} />


        <div className={styles.postsList}>
          {filteredPosts.length === 0 ? (
            <div className={styles.noPosts}>
              {activeTab === 'all' 
                ? 'Ще немає постів. Будьте першим!' 
                : 'У вас ще немає постів. Створіть перший!'}
            </div>
          ) : (
            filteredPosts.map(post => (
              <Post
                key={post.id}
                post={post}
                currentUser={user}
                onLike={handleLikePost}
                onAddComment={handleAddComment}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}