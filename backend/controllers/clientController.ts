// backend/controllers/clientController.ts
import { Request, Response } from 'express';
import Client from '../models/Client';
import { AuthRequest } from '../middleware/authMiddleware';


export const getClientDashboard = async (req: AuthRequest, res: Response) => {
  console.log('Starting getClientDashboard...');
  try {
    console.log('Fetching dashboard data for user:', req.user);
    // Implement your logic to fetch dashboard data here
    res.status(200).json({ message: 'Client Dashboard' });
  } catch (error) {
    console.error('Error in getClientDashboard:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    console.log('Fetching client by ID:', req.params.id);
    const client = await Client.findById(req.params.id);
    if (!client) {
      console.log('Client not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Client not found' });
    }
    console.log('Client found:', client);
    res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client by ID:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
