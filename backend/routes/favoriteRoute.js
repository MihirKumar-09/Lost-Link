import express from "express";
import User from "../models/User.js";
import Report from "../models/reportSchema.js";
import isLoggedIn from "../middleware/isLogin.js";

const router = express.Router();

//!==========TOGGLE FAVORITE==========
router.post("/toggle/:reportId", isLoggedIn, async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user._id;

    // 1. Check report exists
    const reportExists = await Report.findById(reportId);
    if (!reportExists) {
      return res.status(404).json({ message: "Report not found" });
    }

    // 2. Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Check already favorite
    const alreadyFavorite = user.favorites.includes(reportId);

    if (alreadyFavorite) {
      user.favorites.pull(reportId);
      await user.save();

      return res.status(200).json({
        message: "Removed from favorites",
        isFavorite: false,
      });
    }

    // Prevent duplicate
    if (!user.favorites.includes(reportId)) {
      user.favorites.push(reportId);
    }

    await user.save();

    return res.status(200).json({
      message: "Added to favorites",
      isFavorite: true,
    });
  } catch (err) {
    console.log("Toggle favorite error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
