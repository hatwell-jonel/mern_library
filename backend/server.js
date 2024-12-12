
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);


// DB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
};

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on ${process.env.APP_URL}`);
});