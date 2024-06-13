// backend/routes/adminRoutes.ts
import express from 'express';
import { registerAdmin, loginAdmin } from '../services/authService';
import { getAdmins, getAdminById, deleteAdmin, getAdminDashboard } from '../controllers/adminController';
import { adminAuth } from '../middleware/authMiddleware';

const router = express.Router();

// Dashboard route should be defined before the dynamic routes
router.get('/dashboard', adminAuth, getAdminDashboard);

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

router.get('/', adminAuth, getAdmins);
router.get('/:id', adminAuth, getAdminById);
router.delete('/:id', adminAuth, deleteAdmin);

export default router;
