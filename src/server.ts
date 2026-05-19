import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDatabase from "./config/db";

const port = process.env.PORT || 10000;

// Handle unexpected errors globally
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION ❌", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION ❌", err);
  process.exit(1);
});

const startServer = async () => {
  try {
    await connectDatabase();
    console.log("✅ Database connected successfully");

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
