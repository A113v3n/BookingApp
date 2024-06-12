// backend/routes/roomRoutes.ts
import express from 'express';
import { createRoom, getRooms, getRoomById, deleteRoom } from '../controllers/roomController';
import { adminAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', adminAuth, createRoom);
router.get('/', adminAuth, getRooms);
router.get('/:id', adminAuth, getRoomById);
router.delete('/:id', adminAuth, deleteRoom);

export default router;
