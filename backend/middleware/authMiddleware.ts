import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthRequest extends Request {
  user?: {
    id: mongoose.Types.ObjectId;
    role: string;
  };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log('Authenticating request...');
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader); // Add this line
    const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer <token>"
  
    if (!token) {
      console.log('No token, authorization denied');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      req.user = {
        id: new mongoose.Types.ObjectId(decoded.id),
        role: decoded.role,
      };
      console.log('Token verified:', decoded);
      next();
    } catch (err) {
      if (err instanceof Error) {
        console.log('Token verification failed:', err.message);
        res.status(401).json({ message: 'Token is not valid' });
      } else {
        console.log('Token verification failed:', err);
        res.status(401).json({ message: 'Token is not valid' });
      }
    }
  };
  

export const adminAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  await authMiddleware(req, res, async () => {
    if (req.user?.role !== 'admin') {
      console.log('Admin authorization failed');
      return res.status(403).json({ message: 'Admin authorization required' });
    }
    console.log('Admin authorization successful');
    next();
  });
};

export const attendantAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  await authMiddleware(req, res, async () => {
    if (req.user?.role !== 'attendant') {
      console.log('Attendant authorization failed');
      return res.status(403).json({ message: 'Attendant authorization required' });
    }
    console.log('Attendant authorization successful');
    next();
  });
};

export const clientAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  await authMiddleware(req, res, async () => {
    if (req.user?.role !== 'client') {
      console.log('Client authorization failed');
      return res.status(403).json({ message: 'Client authorization required' });
    }
    console.log('Client authorization successful');
    next();
  });
};
