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
// Ensure IClient is used properly

export const registerClient = async (req: Request, res: Response) => {
  console.log('Starting client registration...');
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    console.log('Checking if client already exists...');
    const existingClient: IClient | null = await Client.findOne({ email });
    if (existingClient) {
      console.log('Client already exists with email:', email);
      return res.status(400).json({ message: 'Client already exists' });
    }

    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Creating new client...');
    const newClient: IClient = new Client({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role: 'client'
    });

    console.log('Saving client to database...');
    await newClient.save();

    console.log('Generating JWT token...');
    const token = jwt.sign({ id: newClient._id, role: newClient.role }, JWT_SECRET, { expiresIn: '1h' });

    console.log('Client registered successfully:', newClient);
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error during client registration:', error);
    res.status(500).json({ message: 'Something went wrong 4' });
  }
};


// Client Login
export const loginClient = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    console.log('Finding client by email:', email);
    const client: IClient | null = await Client.findOne({ email });
    if (!client) {
      console.log('Client not found with email:', email);
      return res.status(404).json({ message: 'Client not found' });
    }

    console.log('Comparing passwords for client:', client._id);
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      console.log('Invalid credentials for client:', client._id);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Generating JWT token for client:', client._id);
    const token = generateToken(client._id.toString(), 'client');

    console.log('Client login successful:', client._id);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during client login:', error);
    res.status(500).json({ message: 'Something went wrong 1' });
  }
};
