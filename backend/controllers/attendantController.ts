import { Request, Response } from 'express';
import Attendant from '../models/Attendant';

export const getAttendants = async (req: Request, res: Response) => {
  console.log('Starting getAttendants...');
  try {
    const attendants = await Attendant.find();
    console.log('Attendants found:', attendants);
    res.status(200).json(attendants);
  } catch (error) {
    console.error('Error in getAttendants:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAttendantById = async (req: Request, res: Response) => {
  console.log('Starting getAttendantById with ID:', req.params.id);
  try {
    const attendant = await Attendant.findById(req.params.id);
    if (!attendant) {
      console.log('Attendant not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Attendant not found' });
    }
    console.log('Attendant found:', attendant);
    res.status(200).json(attendant);
  } catch (error) {
    console.error('Error in getAttendantById:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteAttendant = async (req: Request, res: Response) => {
  console.log('Starting deleteAttendant with ID:', req.params.id);
  try {
    const attendant = await Attendant.findByIdAndDelete(req.params.id);
    if (!attendant) {
      console.log('Attendant not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Attendant not found' });
    }
    console.log('Attendant deleted:', attendant);
    res.status(200).json({ message: 'Attendant deleted successfully' });
  } catch (error) {
    console.error('Error in deleteAttendant:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAttendantDashboard = async (req: Request, res: Response) => {
  console.log('Starting getAttendantDashboard...');
  try {
    // Implement your logic to fetch dashboard data here
    console.log('Fetching dashboard data...');
    res.status(200).json({ message: 'Attendant Dashboard' });
  } catch (error) {
    console.error('Error in getAttendantDashboard:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
