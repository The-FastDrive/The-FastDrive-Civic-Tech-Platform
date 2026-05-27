import mongoose from 'mongoose';
import logger from "../utils/logger.js";
import envConfig from './environment.js';

export async function connectDB() {
  try {
    const conn = await mongoose.connect(envConfig.MONGO_URI, {});
    logger.info(`MongoDB connected on host: ${conn.connection.host}`);
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
}