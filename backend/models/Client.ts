// backend/models/Client.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

const ClientSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, default: 'client' },
});

export default mongoose.model<IClient>('Client', ClientSchema);
