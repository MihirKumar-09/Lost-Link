import mongoose from "mongoose";
import fakeData from "./fakeData.js";
import reports from "../models/reportSchema.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("../.env") });
const uri = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connect ✅");
  } catch (err) {
    console.log("failed to connect with DB", err);
  }
};

const initData = async () => {
  try {
    await connectDB(); //Here we call the connectDB function

    // First delete old data from DB;
    await reports.deleteMany({});

    // Insert new data;
    await reports.insertMany(fakeData);
    console.log("Data insert successfully");
  } catch (err) {
    console.log(err);
  }
};
initData(); // Call the init data;
