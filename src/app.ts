import router from "./routes";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import express from "express";

import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5175",
      "http://localhost:5174",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", router);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

export default app;
