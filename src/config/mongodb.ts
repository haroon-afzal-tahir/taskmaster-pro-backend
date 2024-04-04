import mongoose from "mongoose";

export async function connectDb() {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL!, {});
    console.log(`MongoDB connected: ${conn.connection.host}`);

  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
}
