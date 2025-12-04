
import { useState, useEffect } from 'react';
import { postsAPI } from '../data/postsData';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const loadPosts = async () => {
    try {
      setLoading(true);
      const allPosts = postsAPI.getAllPosts();
      setPosts(allPosts);
    } catch (err) {
      setError('Помилка завантаження постів');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 
  const createPost = async (postData) => {
    try {
      setLoading(true);
      const newPost = postsAPI.createPost(postData);
      setPosts(prev => [newPost, ...prev]);
      return { success: true, post: newPost };
    } catch (err) {
      setError('Помилка створення поста');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };


  const likePost = async (postId, userId) => {
    try {
      const updatedPost = postsAPI.likePost(postId, userId);
      if (updatedPost) {
        setPosts(prev => prev.map(post => 
          post.id === postId ? updatedPost : post
        ));
        return { success: true, post: updatedPost };
      }
      return { success: false, error: 'Пост не знайдено' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };


  const addComment = async (postId, commentData) => {
    try {
      const updatedPost = postsAPI.addComment(postId, commentData);
      if (updatedPost) {
        setPosts(prev => prev.map(post => 
          post.id === postId ? updatedPost : post
        ));
        return { success: true, post: updatedPost };
      }
      return { success: false, error: 'Пост не знайдено' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };


  useEffect(() => {
    loadPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    createPost,
    likePost,
    addComment,
    refreshPosts: loadPosts
  };
}