import express from "express";
const router = express.Router();
import passport from "passport";
import User from "../models/User.js";

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
    res.redirect("http://localhost:5173"); // Frontend redirect
  },
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.send("Logged Out");
  });
});

// For frontend ;
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  } else {
    return res.status(401).json({ user: null });
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

export default router;
