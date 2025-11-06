import {useState} from 'react';
import styles from './Project.module.css';
import {useProjects} from '../../hooks/useProjects.js';
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx'; 

export default function Projects(){
    const {projects, loading, error} = useProjects();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProjects = projects.filter(project => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = 
            selectedCategory === 'all' || project.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    if (loading) return <div className={styles.loading}>Завантаження...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return(
        <div className={styles.container}>
           
            <div className={styles.header}>
                <h1>Проєкти</h1>
                <p>Перегляньте цікаві проєкти спільноти</p>
                <button className={styles.viewButton}>Додай проєкт</button>
            </div>

            
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
                </select>           
            </div>

            
            <div className={styles.projectsList}>
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project}/>
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