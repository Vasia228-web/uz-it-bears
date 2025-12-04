import React, { useState, useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
    const { user, loading, error, updateUser } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        bio: '',
        interests: ''
    });

   
    useEffect(() => {
        if (user) {
            setEditForm({
                name: user.name || '',
                bio: user.bio || '',
                interests: user.interests || ''
            });
        }
    }, [user]);

  
    const progressPercentage = user 
        ? (user.currentPoints / user.nextLevelPoints) * 100
        : 0;


    const handleEditToggle = async () => {
        if (isEditing) {
            try {
                await updateUser(editForm);
                setIsEditing(false);
            } catch (error) {
                console.error('Помилка оновлення:', error);
            }
        } else {
            setIsEditing(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleShare = async () => {
        if (!user) return;
        
        const shareUrl = `${window.location.origin}/profile/${user.username}`;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Профіль ${user.name}`,
                    text: user.bio,
                    url: shareUrl,
                });
            } catch (error) {
                console.log('Помилка поділіться:', error);
            }
        } else {
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert('Посилання скопійовано в буфер обміну!');
            });
        }
    };

  
    const formatJoinDate = (dateString) => {
        const date = new Date(dateString);
        return `Представлен: ${date.toLocaleDateString('uk-UA', { 
            month: 'long', 
            year: 'numeric' 
        })}`;
    };

    if (loading) return <div className={styles.loading}>Завантаження профілю...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!user) return <div className={styles.error}>Користувача не знайдено</div>;

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
              
                {isEditing ? (
                    <div className={styles.editForm}>
                        <input
                            name="name"
                            value={editForm.name}
                            onChange={handleInputChange}
                            className={styles.editInput}
                            placeholder="Ім'я"
                        />
                        <input
                            name="bio"
                            value={editForm.bio}
                            onChange={handleInputChange}
                            className={styles.editInput}
                            placeholder="Біографія"
                        />
                        <input
                            name="interests"
                            value={editForm.interests}
                            onChange={handleInputChange}
                            className={styles.editInput}
                            placeholder="Інтереси"
                        />
                    </div>
                ) : (
                    <div className={styles.profileHeader}>
                        <h1>{user.name}</h1>
                        <p className={styles.username}>@{user.username}</p>
                        <p className={styles.bio}>{user.bio}</p>
                        <p className={styles.interests}>{user.interests}</p>
                        <p className={styles.joinDate}>{formatJoinDate(user.joinDate)}</p>
                    </div>
                )}



                <div className={styles.actionButtons}>
                    <button 
                        className={styles.editBtn} 
                        onClick={handleEditToggle}
                        disabled={loading}
                    >
                        {isEditing ? 'Зберегти зміни' : 'Редагувати профіль'}
                    </button>
                    <button 
                        className={styles.shareBtn} 
                        onClick={handleShare}
                    >
                        Поділитись
                    </button>
                </div>


                <div className={styles.divider}></div>
                <div className={styles.statsContainer}>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>{user.followers}</div>
                        <div className={styles.statLabel}>Підписники</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>{user.following}</div>
                        <div className={styles.statLabel}>Підписки</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>{user.projects}</div>
                        <div className={styles.statLabel}>Проекти</div>
                    </div>
                </div>
            </div>

            <div className={styles.levelCard}>
                <h2>Прогрес рівня</h2>
                <div className={styles.levelInfo}>
                    <div className={styles.levelCurrent}>Рівень {user.level}</div>
                    <div className={styles.levelNext}>Рівень {user.level + 1}</div>
                </div>
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div 
                            className={styles.progressFill} 
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <div className={styles.progressText}>
                        {user.currentPoints} / {user.nextLevelPoints} балів
                    </div>
                </div>
            </div>
        </div>
    );
}