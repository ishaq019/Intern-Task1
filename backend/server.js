import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api/users", userRoutes);
app.use("/api/addresses", addressRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "Server error" });
});

app.listen(process.env.PORT || 5000, () => console.log("Server running"));