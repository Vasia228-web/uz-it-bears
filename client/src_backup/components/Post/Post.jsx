
import { useState } from 'react';
import styles from './Post.module.css';

export default function Post({ post, currentUser, onLike, onAddComment }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = async () => {
    await onLike(post.id);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddComment(post.id, newComment);
      setNewComment('');
    } catch (error) {
      console.error('Помилка додавання коментаря:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <h3>{post.username}</h3>
        <span className={styles.postDate}>{formatDate(post.createdAt)}</span>
      </div>
      
      <p className={styles.postContent}>{post.content}</p>
      
      {post.image && (
        <img
          src={post.image}
          alt="Пост"
          className={styles.postImage}
        />
      )}
      
      <div className={styles.postStats}>
        <span>❤️ {post.likes} вподобань</span>
        <span>💬 {post.comments.length} коментарів</span>
      </div>
      
      <div className={styles.postActions}>
        <button onClick={handleLike} className={styles.likeButton}>
           Подобається
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className={styles.commentButton}
        >
           Коментувати
        </button>
      </div>


      {showComments && (
        <div className={styles.commentsSection}>
          <div className={styles.commentsList}>
            {post.comments.map(comment => (
              <div key={comment.id} className={styles.comment}>
                <strong>{comment.username}</strong>
                <p>{comment.content}</p>
                <small>{formatDate(comment.createdAt)}</small>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleAddComment} className={styles.commentForm}>
            <input
              type="text"
              placeholder="Напишіть коментар..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={isSubmitting}
            />
            <button type="submit" disabled={isSubmitting || !newComment.trim()}>
              {isSubmitting ? '...' : 'Надіслати'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}