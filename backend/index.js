import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import userRouter from './routes/userRoutes.js';
import subscriptionRouter from './routes/subscriptionRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import { apiLimiter } from "./middleware/rateLimitter.js";

dotenv.config();

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiter (use the correct form based on your export)
app.use(apiLimiter);   // Or apiLimiter()

// Backend API Routes
app.use('/api/user', userRouter);
app.use('/api/subscriptions', subscriptionRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/admin', adminRouter);

// Serve frontend build
app.use(express.static(path.join(projectRoot, "frontend", "dist")));

// Catch-all using RegExp (Express 5 safe)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(projectRoot, "frontend", "dist", "index.html"));
});

// Start server
const startServer = async () => {
  try {
    console.log("🟡 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB connected successfully");

    app.listen(2000, () => {
      console.log(`🚀 Server running at http://localhost:2000`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
};

startServer();
