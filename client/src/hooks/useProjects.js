import {useState, useEffect} from 'react';
import { projectsAPI } from '../data/projectsData';

export function useProjects(){
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProjects = async () => {
        try{
            setLoading(true);
            const data = projectsAPI.getAllProjects();
            setProjects(data);
        } catch (err) {
            setError('Помилка при завантаженні проектів');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const addProject = async (newProject) => {
        try{
            const project = projectsAPI.addProject(newProject);
            setProjects(prev => [...prev, project]);
            return project;
        } catch(err) {
            setError('Помилка додавання проекту');
            throw err;
        }
    };

    return {
        projects,
        loading,
        error,
        addProject,
        refreshProjects: loadProjects
    };
}