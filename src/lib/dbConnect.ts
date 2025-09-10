// lib/dbConnect.ts

import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://nishantkumar32435:leetcodeNextjs@cluster0.w7ngomp.mongodb.net/";

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable in .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "leetcode-clone",
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Database connected successfully");
    return cached.conn;
  } catch (err) {
    console.error("❌ Database connection error:", err);
    throw err;
  }
}

export default dbConnect;
