// backend/routes/secureRoutes.ts
import express from 'express';
import adminRoutes from './adminRoutes';
import attendantRoutes from './attendantRoutes';
import clientRoutes from './clientRoutes';
import bookingRoutes from './bookingRoutes';
import roomRoutes from './roomRoutes';
import locationRoutes from './locationRoutes';

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/attendant', attendantRoutes);
router.use('/client', clientRoutes);
router.use('/booking', bookingRoutes);
router.use('/room', roomRoutes);
router.use('/location', locationRoutes);

export default router;
