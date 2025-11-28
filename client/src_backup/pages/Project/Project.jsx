import {useState, useEffect} from 'react';
import styles from './Project.module.css';
import {useProjects} from '../../hooks/useProjects.js';
import ProjectCard from '../../components/CreateProject/ProjectCard/ProjectCard.jsx';
import CreateProject from '../../components/CreateProject/CreateProject.jsx';

export default function Projects(){
    const { user } = useAuth();
    const { projects, loading, error, addProject, likeProject, incrementViews } = useProjects();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProjects = projects.filter(project => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.technologies.some(tech => 
                tech.toLowerCase().includes(searchTerm.toLowerCase())
            );

        const matchesCategory = 
            selectedCategory === 'all' || project.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    const handleCreateProject = async (projectData) => {
        return await addProject(projectData);
    };

    const handleLikeProject = async (projectId) => {
        if (!user) {
            alert('Будь ласка, увійдіть в систему');
            return;
        }
        return await likeProject(projectId, user.id);
    };

    const handleViewProject = async (projectId) => {
        await incrementViews(projectId);
    };

    if (loading) return <div className={styles.loading}>Завантаження...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Проєкти</h1>
                <p>Перегляньте цікаві проєкти спільноти</p>
            </div>


            <CreateProject onProjectCreated={handleCreateProject} />

            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Пошук проєктів..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles.categorySelect}
                >
                    <option value="all">Всі категорії</option>
                    <option value="AI">AI</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Web">Web</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Other">Інше</option>
                </select>           
            </div>

            <div className={styles.projectsList}>
                {filteredProjects.map(project => (
                    <ProjectCard 
                        key={project.id} 
                        project={project}
                        currentUser={user}
                        onLike={handleLikeProject}
                        onView={handleViewProject}
                    />
                ))}
            </div> 

            {filteredProjects.length === 0 && (
                <div className={styles.noProjects}>
                    Проєктів не знайдено
                </div>
            )}
        </div>
    );
}