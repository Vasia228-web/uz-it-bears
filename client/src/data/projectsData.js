
export const projectsData = [
    {
        id: 1,
        title: "AI Чат-бот для УжНУ",
        description: "Розумний чат-бот який допомагає студентам з розкладом, інформацією про викладачів та навчальними планами", 
        technologies: ["Python", "TensorFlow", "React", "Node.js"],
        author: "Оксана Кодерка",
        authorId: 2,
        likes: 89,
        views: 456,
        likedBy: [1, 3, 5], 
        image: "/ai-chatbot.jpg",
        category: "AI",
        projectUrl: "https://github.com/username/ai-chatbot",
        fileUrl: "/projects/ai-chatbot.zip",
        createdAt: "2024-01-15",
        isPublished: true
    },
    {
        id: 2,
        title: "Карпатський Туристичний Гід",
        description: "Мобільний додаток для туристів з маршрутами, локаціями та відгуками про Карпати",
        technologies: ["React Native", "Firebase", "Google Maps API"],
        author: "Іван Карпатський",
        authorId: 1,
        likes: 67,
        views: 342,
        likedBy: [2, 4],
        image: "/travel-guide.jpg",
        category: "Mobile",
        projectUrl: "https://github.com/username/travel-guide",
        fileUrl: "/projects/travel-guide.zip",
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
            likes: 0,
            views: 0,
            likedBy: [],
            createdAt: new Date().toISOString(),
            isPublished: true,
            ...newProject
        };
        projectsData.push(project);
        return project;
    },

    likeProject: (projectId, userId) => {
        const project = projectsData.find(p => p.id === projectId);
        if (project) {
            const alreadyLiked = project.likedBy.includes(userId);
            if (alreadyLiked) {
                project.likedBy = project.likedBy.filter(id => id !== userId);
                project.likes -= 1;
            } else {
                project.likedBy.push(userId);
                project.likes += 1;
            }
            return project;
        }
        return null;
    },

    incrementViews: (projectId) => {
        const project = projectsData.find(p => p.id === projectId);
        if (project) {
            project.views += 1;
            return project;
        }
        return null;
    }
};