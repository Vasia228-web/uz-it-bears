export const postsStorage = {
  posts: [
    {
      id: 1,
      userId: 1,
      username: "Іван Карпатський",
      content: "Щойно завершив свій перший fullstack проєкт",
      image: "/img.avif",
      likes: 89,
      comments: [
        {
          id: 1,
          userId: 2,
          username: "Марія",
          content: "Супер! Бажаю успіхів!",
          createdAt: "2024-01-15T11:00:00Z"
        }
      ],
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      userId: 2,
      username: "Марія",
      content: "Сьогодні вивчала React Hooks. Дуже цікаво!",
      image: null,
      likes: 24,
      comments: [],
      createdAt: "2024-01-16T09:15:00Z"
    }
  ]
};

export const postsAPI = {

  getAllPosts: () => {
    return postsStorage.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },


  getUserPosts: (userId) => {
    return postsStorage.posts.filter(post => post.userId === userId);
  },

  createPost:(postData)=>{
    const newPost={
        id: postsStorage.posts.lenth + 1,
        userId: postData.userId,
        username: postData.username,
        content: postData.content,
        image: postData.image || null,
        likes: 0,
        likedBy:[],
        comments: [],
        createdAt: new Date().toISOString()
    };

    postsStorage.posts.unshift(newPost)
    return newPost;
  },

  likePost: (postId, userId)=>{

    const post = postsStorage.posts.find(p => p.id == postId);
    if(!post) return null;

    if(post.likedBy.includes(userId)){
        post.likedBy = post.likedBy.find(id => id !== userId)
        post.likedBy =-1 ;

    }
    else{
        post.likedBy.push(userId)
        post.likedBy +=1;
        
    }
    
    return post;

  },

  addComment:(postId,commentData)=>{
    const post = postsStorage.posts.find(p => p.id === postId);
    if(post){
        const newComment ={
            id: post.comments.length + 1,
            userId: commentData.userId,
            username: commentData.username,
            content: commentData.content,
            createdAt: new Date().toISOString()
        }
        post.content.push(newComment);
        return post;
    }
    return null;
  }

}