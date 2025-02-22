import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authroute.js"
import connectMongoDB from './db/connectMongoDB.js';

const app=express();
dotenv.config();
app.use(express.json());
// console.log(process.env.MONGO_URI);
app.use("/api/auth",authRoutes);
app.listen(8000,()=>{
    console.log("The server is running on port 8000");
    connectMongoDB();
    console.log("THe server is live now ");
})