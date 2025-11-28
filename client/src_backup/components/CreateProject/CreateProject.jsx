import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContext";
import styles from './CreateProject.module.css';

export default function CreateProject({ onProjectCreated }) {
    const { user } = useAuth();
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        category: 'Web',
        projectUrl: '',
        file: null
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/zip') {
            setFormData(prev => ({
                ...prev,
                file: file
            }));
        } else {
            alert('Будь ласка, виберіть ZIP файл');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title || !formData.description || !formData.technologies) {
            alert('Будь ласка, заповніть обов\'язкові поля');
            return;
        }

        setIsLoading(true);
        try {
            const technologiesArray = formData.technologies.split(',').map(tech => tech.trim());
            
            const projectData = {
                title: formData.title,
                description: formData.description,
                technologies: technologiesArray,
                category: formData.category,
                projectUrl: formData.projectUrl,
                fileUrl: formData.file ? URL.createObjectURL(formData.file) : null,
                author: user.username,
                authorId: user.id,
                image: '/default-project.jpg'
            };

            const result = await onProjectCreated(projectData);
            
            if (result.success) {
                setFormData({
                    title: '',
                    description: '',
                    technologies: '',
                    category: 'Web',
                    projectUrl: '',
                    file: null
                });
                setIsCreating(false);
                alert('Проект успішно додано!');
            } else {
                alert('Помилка: ' + result.error);
            }
        } catch (error) {
            alert('Сталася помилка при створенні проекту');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            description: '',
            technologies: '',
            category: 'Web',
            projectUrl: '',
            file: null
        });
        setIsCreating(false);
    };

    if (!isCreating) {
        return (
            <div className={styles.createProjectButton}>
                <button 
                    onClick={() => setIsCreating(true)}
                    className={styles.openButton}
                >
                    ➕ Додати проект
                </button>
            </div>
        );
    }

    return (
        <div className={styles.createProjectForm}>
            <h3>Створити новий проект</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Назва проекту *</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Введіть назву проекту"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Опис проекту *</label>
                    <textarea
                        name="description"
                        placeholder="Опишіть ваш проект"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Технології * (через кому)</label>
                    <input
                        type="text"
                        name="technologies"
                        placeholder="React, Node.js, MongoDB"
                        value={formData.technologies}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Категорія</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value="Web">Web</option>
                            <option value="Mobile">Mobile</option>
                            <option value="AI">AI</option>
                            <option value="Desktop">Desktop</option>
                            <option value="Other">Інше</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>URL проекту (GitHub тощо)</label>
                        <input
                            type="url"
                            name="projectUrl"
                            placeholder="https://github.com/username/project"
                            value={formData.projectUrl}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>ZIP файл проекту</label>
                    <div className={styles.fileUpload}>
                        <label className={styles.fileLabel}>
                             Завантажити ZIP
                            <input
                                type="file"
                                accept=".zip"
                                onChange={handleFileChange}
                                className={styles.fileInput}
                            />
                        </label>
                        {formData.file && (
                            <span className={styles.fileName}>{formData.file.name}</span>
                        )}
                    </div>
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
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Створення...' : 'Створити проект'}
                    </button>
                </div>
            </form>
        </div>
    );
}