import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import "./config/passport.js";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { initSocket } from "./socket/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! SESSION FIRST
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: URI,
      collectionName: "session",
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
);

//!=========PASSPORT AFTER SESSION=========
app.use(passport.initialize());
app.use(passport.session());

//!=========IMPORT ALL ROUTES=========
import ReportRoute from "./routes/reportRoute.js";
import AuthRoute from "./routes/auth.js";
import LostReportRoute from "./routes/lostReport.js";
import FoundReportRoute from "./routes/foundReport.js";
import FavoriteRoute from "./routes/favoriteRoute.js";

// NEW ROUTES Register
import ConversationRoute from "./routes/conversationRoutes.js";
import MessageRoute from "./routes/messageRoutes.js";
import NotificationRoute from "./routes/notificationRoutes.js";

//!=========REGISTER WITH SERVER=========
app.use("/reports", ReportRoute);
app.use("/auth", AuthRoute);
app.use("/reports", LostReportRoute);
app.use("/reports", FoundReportRoute);
app.use("/favorites", FavoriteRoute);

// NEW ROUTES Register
app.use("/conversations", ConversationRoute);
app.use("/messages", MessageRoute);
app.use("/notifications", NotificationRoute);

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connect with DB");
  } catch (err) {
    console.log("Failed to connect ", err);
  }
};

// Initialize Socket.IO
initSocket(server);

server.listen(PORT, async () => {
  console.log(`Server listen on PORT ${PORT}`);
  await connectDB();
});
