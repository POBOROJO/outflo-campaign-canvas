import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import campaignRoutes from "./routes/campaignRoutes";
import messageRoutes from "./routes/messageRoutes";
import leadsRoutes from "./routes/leadsRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v1/campaigns", campaignRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/leads", leadsRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running", status: "OK" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
