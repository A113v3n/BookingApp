// backend/models/Room.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  location: mongoose.Types.ObjectId;
  capacity: number;
  available: boolean;
}

const RoomSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: mongoose.Types.ObjectId, ref: 'Location', required: true },
  capacity: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

export default mongoose.model<IRoom>('Room', RoomSchema);
