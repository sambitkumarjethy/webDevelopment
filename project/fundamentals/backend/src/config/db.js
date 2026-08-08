import mongoose from "mongoose";

export async function connectDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`[db] connected -> ${mongoose.connection.name}`);
}
