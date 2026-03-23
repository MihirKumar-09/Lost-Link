import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();

const PORT = 8080;
const URI = process.env.MONGODB_URI;

//!============CORS SETUP============
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
      "http://192.168.1.8:5173",
      "http://192.168.1.8:8080",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

//!=========IMPORT ALL ROUTES=========
import ReportRoute from "./routes/reportRoute.js";

//!=========REGISTER WITH SERVER=========
app.use("/reports", ReportRoute);

app.listen(PORT, () => {
  console.log(`Server listen on PORT ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    mongoose.connect(URI);
    console.log("Connect with DB");
  } catch (err) {
    console.log("Failed to connect ", err);
  }
};
