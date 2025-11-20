export const userData = {
  id: 1,
  name: "Іван Карпатський",
  username: "ivan_carpathian",
  email: "ivan@example.com",
  bio: "Fullstack розробник з Ужгорода.",
  interests: "Люблю React, Node.js та гори Карпаt ",
  joinDate: "2024-03-15",
  avatar: "/user.png",
  level: 12,
  currentPoints: 450,
  nextLevelPoints: 700,
  followers: 234,
  following: 187,
  projects: 19,
  createdAt: "2024-03-15T10:00:00Z",
  updatedAt: "2024-03-20T15:30:00Z"
};

export const userAPI = {
 
  getUserProfile: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userData);
      }, 500);
    });
  },

    updateUserProfile: (updatedData) =>{
        return new Promise((resolve)=> {
            setTimeout(()=>{
                Object.assign(userData, updatedData,{
                    updatedAt: new Date().toISOString()
                });
                resolve(userData);
            }, 500);
        });
    },

    updateUserStats: (stats) =>{
        return new Promise((resolve)=>{
            setTimeout(() =>{
                Object.assign(userData, stats);
                resolve(userData);
            }, 300);
        })
    }

}