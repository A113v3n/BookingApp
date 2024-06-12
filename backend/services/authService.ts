// backend/services/authService.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import Admin from '../models/Admin';
import Attendant from '../models/Attendant';
import Client from '../models/Client';
import { IAdmin } from '../models/Admin';
import { IAttendant } from '../models/Attendant';
import { IClient } from '../models/Client';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1h' });
};

// Admin Registration
export const registerAdmin = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingAdmin: IAdmin | null = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin: IAdmin = new Admin({ firstName, lastName, email, password: hashedPassword, role: 'admin' });
    await newAdmin.save();

    const token = generateToken(newAdmin._id.toString(), newAdmin.role);
    res.status(201).json({ result: newAdmin, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Admin Login
export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingAdmin: IAdmin | null = await Admin.findOne({ email });
    if (!existingAdmin) return res.status(404).json({ message: 'Admin not found' });

    const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(existingAdmin._id.toString(), existingAdmin.role);
    res.status(200).json({ result: existingAdmin, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Attendant Registration
export const registerAttendant = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, phoneNumber, bio, location } = req.body;
  try {
    const existingAttendant: IAttendant | null = await Attendant.findOne({ email });
    if (existingAttendant) return res.status(400).json({ message: 'Attendant already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newAttendant: IAttendant = new Attendant({ firstName, lastName, email, password: hashedPassword, phoneNumber, bio, location, role: 'attendant' });
    await newAttendant.save();

    const token = generateToken(newAttendant._id.toString(), newAttendant.role);
    res.status(201).json({ result: newAttendant, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Attendant Login
export const loginAttendant = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingAttendant: IAttendant | null = await Attendant.findOne({ email });
    if (!existingAttendant) return res.status(404).json({ message: 'Attendant not found' });

    const isPasswordCorrect = await bcrypt.compare(password, existingAttendant.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(existingAttendant._id.toString(), existingAttendant.role);
    res.status(200).json({ result: existingAttendant, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Client Registration
export const registerClient = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  try {
    const existingClient: IClient | null = await Client.findOne({ email });
    if (existingClient) return res.status(400).json({ message: 'Client already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newClient: IClient = new Client({ firstName, lastName, email, password: hashedPassword, phoneNumber, role: 'client' });
    await newClient.save();

    const token = generateToken(newClient._id.toString(), newClient.role);
    res.status(201).json({ result: newClient, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Client Login
export const loginClient = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingClient: IClient | null = await Client.findOne({ email });
    if (!existingClient) return res.status(404).json({ message: 'Client not found' });

    const isPasswordCorrect = await bcrypt.compare(password, existingClient.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(existingClient._id.toString(), existingClient.role);
    res.status(200).json({ result: existingClient, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
