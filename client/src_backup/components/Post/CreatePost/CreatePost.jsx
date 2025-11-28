
import { useState } from 'react';
import styles from './CreatePost.module.css';

export default function CreatePost({ user, onCreatePost }) {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    image: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      alert('Будь ласка, введіть текст поста');
      return;
    }

    setIsLoading(true);
    try {
      const postData = {
        userId: user.id,
        username: user.username,
        content: formData.content,
        image: formData.image
      };

      const result = await onCreatePost(postData);
      
      if (result.success) {
        setFormData({ content: '', image: null });
        setIsCreating(false);
      } else {
        alert('Помилка створення поста: ' + result.error);
      }
    } catch (error) {
      alert('Сталася помилка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ content: '', image: null });
    setIsCreating(false);
  };

  if (!isCreating) {
    return (
      <div className={styles.createPostButton}>
        <button 
          onClick={() => setIsCreating(true)}
          className={styles.openButton}
        >
           Створити пост
        </button>
      </div>
    );
  }

  return (
    <div className={styles.createPostForm}>
      <h3>Створити новий пост</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="content"
          placeholder="Що у вас на думці?"
          value={formData.content}
          onChange={handleInputChange}
          className={styles.textarea}
          rows="4"
          required
        />
        
        <div className={styles.imageUpload}>
          <label>
            Додати зображення
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
          </label>
          {formData.image && (
            <div className={styles.imagePreview}>
              <img src={formData.image} alt="Прев'ю" />
              <button 
                type="button" 
                onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                className={styles.removeImage}
              >
                ❌
              </button>
            </div>
          )}
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={handleCancel}
            className={styles.cancelButton}
            disabled={isLoading}
          >
            Скасувати
          </button>
          <button 
            type="submit" 
            disabled={isLoading || !formData.content.trim()}
            className={styles.submitButton}
          >
            {isLoading ? 'Публікація...' : 'Опублікувати'}
          </button>
        </div>
      </form>
    </div>
  );
}