import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import globalErrorExceptionMiddleware from "./middleware/global_error_exception.middleware";
import { Request, Response } from "express";
import routes from "./routes/routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL!, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(routes);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(globalErrorExceptionMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
