import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import ConnectToDatabase from "./db/db.js";

ConnectToDatabase();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
