import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// 
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// DB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB"); 
    } catch (error) {
        console.log(error);
    }
};

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on ${process.env.APP_URL}`);
});