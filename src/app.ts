import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import router from "./routes";

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS config (Render-safe)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  }),
);

// Logs
app.use(morgan("dev"));

// Cookies
app.use(cookieParser());

// Routes
app.use("/api", router);

// Health check (IMPORTANT for Render debugging)
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running 🚀",
  });
});

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error("GLOBAL ERROR ❌", err);

  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

export default app;
