import mongoose from "mongoose";

const clean = v => v.trim().toLowerCase().replace(/\s+/g, " ");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    set: clean
  }
}, { timestamps: true });

export default mongoose.model("Address", addressSchema);