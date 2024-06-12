// backend/controllers/bookingController.ts
import { Request, Response } from 'express';
import Booking from '../models/Booking';
import { isBookingConflict } from '../services/bookingService';

export const createBooking = async (req: Request, res: Response) => {
  const { client, attendant, room, location, startTime, endTime, amenities } = req.body;
  try {
    const conflict = await isBookingConflict(startTime, endTime, room, attendant);
    if (conflict) return res.status(400).json({ message: 'Booking conflict detected.' });

    const newBooking = new Booking({ client, attendant, room, location, startTime, endTime, amenities });
    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
