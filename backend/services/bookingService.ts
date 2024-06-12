// backend/services/bookingService.ts
import Booking from '../models/Booking';

export const isBookingConflict = async (startTime: Date, endTime: Date, room: string, attendant: string): Promise<boolean> => {
  const conflict = await Booking.findOne({
    $or: [
      {
        room,
        $or: [
          { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        ],
      },
      {
        attendant,
        $or: [
          { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        ],
      },
    ],
  });

  return !!conflict;
};
