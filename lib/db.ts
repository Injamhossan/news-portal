import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Global interface to prevent multiple connections in development

// Global interface to prevent multiple connections in development
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    // If the cached connection is to the wrong database (e.g. 'test' instead of 'news_db'),
    // we should disconnect and reconnect.
    if (cached.conn.connection.name !== "news_db") {
         console.log(`Detected database mismatch: ${cached.conn.connection.name}. Switching to news_db...`);
         await cached.conn.connection.close();
         cached.conn = null;
         cached.promise = null;
    } else {
        return cached.conn;
    }
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      dbName: "news_db",
    };

    if (!MONGODB_URI) {
        throw new Error(
            "Please define the MONGODB_URI environment variable inside .env.local"
        );
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
