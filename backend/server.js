import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
const cp = cookieParser();

import connectToMongoDB from "./db/connection.js";
import AuthRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const port = process.env.PORT || 5000;

// Adding MiddleWares

//Middleware to parse the incoming requests with JSON payloads
app.use(express.json());
app.use(cp);

// Middleware for Authentication related Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res)=>{
    res.send("Hello World!");
});


app.listen(port,()=> {
    connectToMongoDB();
    console.log(`Running at ${port}`)
});