export const projectsData = [
    {
        id: 1,
        title: "AI Чат-бот для УжНУ",
        description: "Розумний чат-бот який допомагає студентам з розкладом, інформацією про викладачів та навчальними планами", 
        technologies: ["Python", "TensorFlow", "React", "Node.js"],
        author: "Оксана Кодерка",
        likes: 89,
        views: 456,
        image: "/ai-chatbot.jpg",
        category: "AI",
        createdAt: "2024-01-15",
        isPublished: true
    },
    {
        id: 2,
        title: "Карпатський Туристичний Гід",
        description: "Мобільний додаток для туристів з маршрутами, локаціями та відгуками про Карпати",
        technologies: ["React Native", "Firebase", "Google Maps API"],
        author: "Іван Карпатський", 
        likes: 67,
        views: 342,
        image: "/travel-guide.jpg",
        category: "Mobile",
        createdAt: "2024-01-10",
        isPublished: true
    }
];

export const projectsAPI = {
    getAllProjects: () => {
        return projectsData.filter(project => project.isPublished);
    },

    getProjectById: (id) => {
        return projectsData.find(project => project.id === id);
    },

    getProjectsByCategory: (category) => {
        return projectsData.filter(project => 
            project.category === category && project.isPublished
        );
    },

    addProject: (newProject) => { 
        const project = {
            id: projectsData.length + 1,
            ...newProject,
            createdAt: new Date().toISOString(),
            isPublished: true
        };
        projectsData.push(project);
        return project;
    }
};