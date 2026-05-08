import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: { type: String, unique: true },
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true, trim: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] }
}, { timestamps: true });

export default mongoose.model("User", userSchema);