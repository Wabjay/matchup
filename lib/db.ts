// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_DB!;
// console.log(MONGODB_URI)//
// if (!MONGODB_URI) {
//   throw new Error("❌ MONGODB_URI is missing in .env file");
// }

// // Use a global variable to cache the connection
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// console.log("✅ Cached connection", (global as any).mongoose)
// export async function connectDB() {
//   // Return the cached connection if it exists
//   if (cached.conn) {
//     console.log("✅ Using cached MongoDB connection");
//     return cached.conn;
//   }

//   try {
//     // Create a new connection promise if it doesn't exist
//     if (!cached.promise) {
//       const options = {
//         dbName: "matchup_jobs", // Specify the database name
//         bufferCommands: false, // Disable Mongoose buffering
//         serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
//         socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//       };

//       cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
//         console.log("✅ MongoDB (Mongoose) connected");
//         return mongoose;
//       });
//     }

//     // Await the connection promise and cache the connection
//     cached.conn = await cached.promise;
//     return cached.conn;
//   } catch (error) {
//     console.error("❌ MongoDB Connection Failed:", error);
//     throw new Error("MongoDB Connection Error");
//   }
// }

"use server"
import mongoose from "mongoose";

// Define an interface for the global object to improve type safety
interface GlobalWithMongoose {
  mongoose?: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}
console.log("MONGODB_URI:", process.env.NEXT_PUBLIC_MONGODB_URI);
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

// Use a typed global cache
let cached = (global as GlobalWithMongoose).mongoose || { conn: null, promise: null };

// Store the cache back to global
(global as GlobalWithMongoose).mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn; // Return existing connection

  try {
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI, {
        dbName: "matchup_jobs", // Your database name
        // Optional: Add bufferCommands if needed for your use case
        bufferCommands: false,
      }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    if (process.env.NODE_ENV !== "production") {
      console.log("✅ MongoDB Connected!");
    }
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    throw error; // Re-throw to let the caller handle it
  }
}
