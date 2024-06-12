// backend/routes/locationRoutes.ts
import express from 'express';
import { createLocation, getLocations, getLocationById, deleteLocation } from '../controllers/locationController';
import { adminAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', adminAuth, createLocation);
router.get('/', adminAuth, getLocations);
router.get('/:id', adminAuth, getLocationById);
router.delete('/:id', adminAuth, deleteLocation);

export default router;
