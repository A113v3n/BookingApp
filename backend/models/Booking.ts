// backend/models/Booking.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  client: mongoose.Schema.Types.ObjectId;
  attendant: mongoose.Schema.Types.ObjectId;
  room: mongoose.Schema.Types.ObjectId;
  location: mongoose.Schema.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  amenities: string[];
}

const BookingSchema: Schema = new Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  attendant: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendant', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  amenities: { type: [String], default: [] },
});

BookingSchema.index({ room: 1, startTime: 1, endTime: 1 });
BookingSchema.index({ attendant: 1, startTime: 1, endTime: 1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);
