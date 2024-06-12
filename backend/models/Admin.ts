// backend/models/Admin.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

const AdminSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

export default mongoose.model<IAdmin>('Admin', AdminSchema);
