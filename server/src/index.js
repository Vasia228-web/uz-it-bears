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

// ...
const allowedOrigins = [
    process.env.CLIENT_URL, // Ваш основной/старый
    /^https:\/\/uz-it-bears-\S+\.vercel\.app$/, // Регулярка для любых Vercel Preview/Deployment URL
    // Можете добавить сюда и просто https://uz-it-bears.vercel.app, если он не попадет в .env
];

app.use(cors({
    origin: (origin, callback) => {
        // Проверка, что origin разрешен (в массиве или соответствует регулярке)
        if (!origin || allowedOrigins.find(o => o === origin || (o instanceof RegExp && o.test(origin)))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
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