import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    enum: ["user", "admin", "moderator"],
    default: ["user"],
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
