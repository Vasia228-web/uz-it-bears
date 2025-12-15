require('dotenv').config()
const express =require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router =require('./router/index')
const errorMiddleware = require('./middlewares/error-middlewares');

const PORT = process.env.PORT || 5001;
const app = express()

// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true
// }));
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://uz-it-bears-bzfu.vercel.app'
    ];

    // дозволяємо всі vercel preview
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app')
    ) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));

app.use(cookieParser())
app.use(express.json())
app.use('/api', router )
app.use(errorMiddleware)

const start = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, ()=> console.log(`server start on ${PORT}`))
    }
    
    catch(e){
        console.log(e)
    }
}

start()