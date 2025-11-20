
export const userStorage = {
  users: [
    {
      id: 1,
      email: 'user@example.com',
      password: 'password123',
      username: 'ivan_carpathian',
      name: 'Іван Карпатський',
      bio: 'Fullstack розробник з Ужгорода.',
      interests: 'Люблю React, Node.js та гори Карпат ♥',
      joinDate: '2024-03-15',
      followers: 234,
      following: 187,
      projects: 19,
      level: 12,
      currentPoints: 450,
      nextLevelPoints: 700,
      avatar: '/user.png'
    }
  ]
};


export const loginAPI = {

  checkUserExists: (email) => {
    return userStorage.users.some(user => user.email === email);
  },

  findUser: (email, password) => {
    return userStorage.users.find(
      user => user.email === email && user.password === password
    );
  },


  addUser: (userData) => {
    const newUser = {
      id: userStorage.users.length + 1,
      email: userData.email,
      password: userData.password,
      username: userData.username,
      name: userData.username,
      bio: '',
      interests: '',
      joinDate: new Date().toISOString().split('T')[0],
      followers: 0,
      following: 0,
      projects: 0,
      level: 1,
      currentPoints: 0,
      nextLevelPoints: 100,
      avatar: '/user.png',
      ...userData 
    };

    userStorage.users.push(newUser);
    return newUser;
  },


  getUserById: (id) => {
    return userStorage.users.find(user => user.id === id);
  },

  updateUser: (id, updates) => {
    const userIndex = userStorage.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      userStorage.users[userIndex] = { 
        ...userStorage.users[userIndex], 
        ...updates 
      };
      return userStorage.users[userIndex];
    }
    return null;
  }
};