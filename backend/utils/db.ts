// backend/utils/db.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
  } catch (err) {
    const error = err as Error;
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
