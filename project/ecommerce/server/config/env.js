import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

console.log("ENV LOADED DB_USER =", process.env.DB_USER);

if (!process.env.DB_USER) {
  throw new Error("❌ ENV NOT LOADED");
}
