// backend/routes/bookingRoutes.ts
import express from 'express';
import { createBooking, getBookings, getBookingById, deleteBooking } from '../controllers/bookingController';
import { clientAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', clientAuth, createBooking);
router.get('/', clientAuth, getBookings);
router.get('/:id', clientAuth, getBookingById);
router.delete('/:id', clientAuth, deleteBooking);

export default router;
