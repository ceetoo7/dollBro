import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';


//rest object
const app = express();

//configure env
dotenv.config();

//database config
connectDB();

//middelwares
app.use(express.json());
app.use(morgan('dev'));


//routtes
app.use('/api/v1/auth', authRoutes);


//rest api
app.get("/",  (req, res) => {
    res.send('<h1>Welcome to ecommerce site</h1>');
});

//port
const PORT = process.env.PORT || 8080;


//run listen
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});