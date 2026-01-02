import "./config/env.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import app from "./app.js";
import { v2 as cloudinary } from "cloudinary";
import "./database/db.js";

console.log("ENV DEBUG:", {
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
