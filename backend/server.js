import dotenv from 'dotenv';
dotenv.config();


import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js'

// backend/index.js or backend/server.js
import express from "express";
import cors from "cors";


//rest object
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Added credentials: true





//configure env
dotenv.config();

//database config
connectDB();

//middlewares
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoute);

//rest api
app.get("/", (req, res) => {
    res.send('<h1>Welcome to ecommerce site</h1>');
});

//port
const PORT = process.env.PORT || 8080;


//run listen
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});