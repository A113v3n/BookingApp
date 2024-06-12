// backend/models/Location.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ILocation extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  attendants: mongoose.Types.ObjectId[];
  rooms: mongoose.Types.ObjectId[];
}

const LocationSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  attendants: [{ type: mongoose.Types.ObjectId, ref: 'Attendant' }],
  rooms: [{ type: mongoose.Types.ObjectId, ref: 'Room' }],
});

export default mongoose.model<ILocation>('Location', LocationSchema);
