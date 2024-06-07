import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import connectToMongoDB from "./db/connection.js";
import AuthRoutes from "./routes/authRoutes.js";

const port = process.env.PORT || 5000;

app.get("/", (req, res)=>{
    res.send("Hello World!");
});

// Adding MiddleWares

// Middleware for Authentication related Routes
app.use("/api/auth", AuthRoutes);

app.listen(port,()=> {
    connectToMongoDB();
    console.log(`Running at ${port}`)
});
