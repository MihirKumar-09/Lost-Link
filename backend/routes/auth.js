import express from "express";
const router = express.Router();
import passport from "passport";
import User from "../models/User.js";
import isLogin from "../middleware/isLogin.js";
import Report from "../models/reportSchema.js";
import cloudinary from "../utils/uploadToCloudinary.js";

//! Google SignUp and Login
// Step 1 -> Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Step 2 -> Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/auth-success`); // Frontend redirect(Store the path in local storage and redirect to that page)
  },
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.send("Logged Out");
  });
});

//!===========FETCH CURRENT USER============
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  } else {
    return res.status(401).json({ user: null });
  }
});

//!=============UPDATE ACCOUNT STATUS=============
router.put("/update-profile", isLogin, async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name.trim(),
        phone: phone ? phone.trim() : "",
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("update profile error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
});

//! Mobile number SingUp and Login;
router.post("/phone-login", async (req, res, next) => {
  try {
    const { phone, name, email } = req.body;

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone, name, email });
    }
    // Create session
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ user });
    });
  } catch (err) {
    next(err);
  }
});

//!==========ACCOUNT DELETE===========
router.delete("/delete-account", async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all report of user(clean image from cloudinary);
    const userReports = await Report.find({ userId });

    // Delete images from cloudinary;
    for (const report of userReports) {
      if (report.imagePublicId) {
        await cloudinary.uploader.destroy(report.imagePublicId);
      }
    }

    // Delete all reports of user;
    await Report.deleteMany({ userId });

    // Delete user;
    await User.findByIdAndDelete(userId);

    // Destroy session;
    req.logout(function (err) {
      if (err) return next(err);

      req.session.destroy(() => {
        res.clearCookie("connect.sid");

        return res.status(200).json({
          message: "Account deleted successfully",
        });
      });
    });
  } catch (err) {
    console.error("Delete account error:", err);
    return res.status(500).json({
      message: "Failed to delete account",
      error: err.message,
    });
  }
});

export default router;
