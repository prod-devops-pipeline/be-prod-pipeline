import dotenv from "dotenv";
import app from "./app";
import connetDataBase from "./config/db";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT || 5000;

connetDataBase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err: any) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
