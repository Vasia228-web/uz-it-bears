import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }) {
    return (
        <div className={styles.projectCard}>
            <div className={styles.projectImage}>
                <img src={project.image} alt={project.title} />
            </div>
            
            <div className={styles.projectContent}>
                <h3>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                
                <div className={styles.technologies}>
                    {project.technologies.map(tech => (
                        <span key={tech} className={styles.techTag}>{tech}</span>
                    ))}
                </div>
                
                <div className={styles.projectFooter}>
                    <span className={styles.author}>{project.author}</span>
                    <div className={styles.stats}>
                        <span>❤️ {project.likes}</span>
                        <span>👁️ {project.views}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}