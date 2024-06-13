// backend/routes/clientRoutes.ts
import express from 'express';
import { registerClient, loginClient } from '../services/authService';
import { getClients, getClientById, deleteClient, getClientDashboard } from '../controllers/clientController';
import { clientAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerClient);
router.post('/login', loginClient);

router.get('/dashboard', clientAuth, getClientDashboard);

router.get('/', clientAuth, getClients);
router.get('/:id', clientAuth, getClientById);
router.delete('/:id', clientAuth, deleteClient);


export default router;
