// backend/models/Notification.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  user: mongoose.Schema.Types.ObjectId;
  message: string;
  date: Date;
  read: boolean;
}

const NotificationSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

export default mongoose.model<INotification>('Notification', NotificationSchema);
