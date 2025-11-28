import { useState, useEffect } from 'react';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, currentUser, onLike, onView }) {
    const [isLiked, setIsLiked] = useState(false);
    const [localLikes, setLocalLikes] = useState(project.likes);

    useEffect(() => {
        if (currentUser && project.likedBy) {
            setIsLiked(project.likedBy.includes(currentUser.id));
        }
        setLocalLikes(project.likes);
    }, [project, currentUser]);

    const handleLike = async (e) => {
        e.stopPropagation();
        if (!currentUser) {
            alert('Будь ласка, увійдіть в систему щоб вподобати проект');
            return;
        }

        const result = await onLike(project.id);
        if (result.success) {
            setIsLiked(!isLiked);
            setLocalLikes(result.project.likes);
        }
    };

    const handleCardClick = () => {
        onView(project.id);
    };

    const handleUrlClick = (e, url) => {
        e.stopPropagation();
        window.open(url, '_blank');
    };

    const handleDownloadClick = (e, url) => {
        e.stopPropagation(); 
        const link = document.createElement('a');
        link.href = url;
        link.download = ''; 
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.projectCard} onClick={handleCardClick}>
            <div className={styles.projectImage}>
                <img src={project.image} alt={project.title} />
                <div className={styles.categoryBadge}>{project.category}</div>
            </div>
            
            <div className={styles.projectContent}>
                <h3>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                
                <div className={styles.technologies}>
                    {project.technologies.map(tech => (
                        <span key={tech} className={styles.techTag}>{tech}</span>
                    ))}
                </div>

                {project.projectUrl && (
                    <div className={styles.projectUrl}>
                        <button 
                            onClick={(e) => handleUrlClick(e, project.projectUrl)}
                            className={styles.urlButton}
                        >
                             Переглянути проект
                        </button>
                    </div>
                )}

                {project.fileUrl && (
                    <div className={styles.fileDownload}>
                        <button 
                            onClick={(e) => handleDownloadClick(e, project.fileUrl)}
                            className={styles.downloadButton}
                        >
                            Завантажити ZIP
                        </button>
                    </div>
                )}
                
                <div className={styles.projectFooter}>
                    <span className={styles.author}>{project.author}</span>
                    <div className={styles.stats}>
                        <button 
                            onClick={handleLike}
                            className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
                        >
                            {isLiked ? '❤️' : '🤍'} {localLikes}
                        </button>
                        <span>👁️ {project.views}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
