import router from "./routes";
import morgan from "morgan";
import connetDataBase from "./config/db";
import cookieParser from "cookie-parser";
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5175','http://localhost:5174','http://localhost:5173'],
  credentials: true
}));

app.use(morgan("dev"));

app.use(cookieParser());

app.use("/api", router);
app.use("/api/uat", router);
app.use("/api/dev", router);
app.use("/api", router);

connetDataBase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err: any) => {
    console.log("error", err);
    process.exit(1);
  });

app.use((err: any, req: any, res: any, next: any) => {
  console.log(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!", err: err.message });
});
