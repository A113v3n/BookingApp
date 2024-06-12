// backend/controllers/adminController.ts
import { Request, Response } from 'express';
import Admin from '../models/Admin';

export const getAdmins = async (req: Request, res: Response) => {
  console.log('GET /api/admin/ - Fetching all admins');
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAdminById = async (req: Request, res: Response) => {
  console.log(`GET /api/admin/${req.params.id} - Fetching admin by ID`);
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json(admin);
  } catch (error) {
    console.error(`Error fetching admin by ID (${req.params.id}):`, error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  console.log(`DELETE /api/admin/${req.params.id} - Deleting admin by ID`);
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error(`Error deleting admin by ID (${req.params.id}):`, error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
