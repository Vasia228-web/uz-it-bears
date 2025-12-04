
export const rankingData = [
    {
        id: 1,
        name: "Лісові Розробники",
        type: "team",
        level: 18,
        points: 4650,
        projects: 22,
        avatar: "/team-avatar.jpg",
        members: ["Іван", "Марія", "Петро"],
        joinDate: "2023-05-15"
    },
    {
        id: 2,
        name: "Оксана Кодерка",
        type: "user", 
        level: 20,
        points: 5100,
        projects: 25,
        avatar: "/user-avatar.jpg",
        skills: ["React", "Node.js", "UI/UX"],
        joinDate: "2023-03-10"
    },
    {
        id: 3,
        name: "Марія Гірська",
        type: "user",
        level: 15,
        points: 3200,
        projects: 19,
        avatar: "/user-avatar.jpg",
        skills: ["Python", "AI", "Data Science"],
        joinDate: "2023-07-22"
    }
];


export const rankingAPI = {
   
    getAllRankings: () => {
        return rankingData.sort((a, b) => b.points - a.points);
    },
    
   
    getUserRanking: (userId) => {
        return rankingData.find(item => item.id === userId);
    },
    
   
    updatePoints: (userId, newPoints) => {
        const user = rankingData.find(item => item.id === userId);
        if (user) {
            user.points = newPoints;
            
            user.level = Math.floor(newPoints / 250) + 1;
        }
        return user;
    },
    
   
    addRanking: (newUser) => {
        const user = {
            id: rankingData.length + 1,
            ...newUser,
            level: 1,
            points: 0,
            projects: 0,
            joinDate: new Date().toISOString()
        };
        rankingData.push(user);
        return user;
    }
};


export const pointsSystem = {
    addProject: 100,
    projectLiked: 5,
    projectCommented: 3,
    projectFeatured: 200,
    dailyLogin: 10,
    completeProfile: 50,
    levelUp: 100
};