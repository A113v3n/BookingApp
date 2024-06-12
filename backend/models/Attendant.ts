// backend/models/Attendant.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendant extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  bio: string;
  availability: boolean;
  lastAssigned: Date;
  location: mongoose.Schema.Types.ObjectId;
  role: string;
}

const AttendantSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  bio: { type: String, required: true },
  availability: { type: Boolean, default: true },
  lastAssigned: { type: Date, default: Date.now },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  role: { type: String, default: 'attendant' },
});

export default mongoose.model<IAttendant>('Attendant', AttendantSchema);
