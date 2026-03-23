import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  name: String,
  email: String,
  avatar: String,
});

const User = mongoose.model("User", userSchema);
export default User;
