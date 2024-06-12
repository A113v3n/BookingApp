// backend/app.ts
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db';
import secureRoutes from './routes/secureRoutes';

dotenv.config();

console.log('Environment Variables Loaded:');
console.log(`PORT: ${process.env.PORT}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);
console.log(`MONGODB_URI: ${process.env.MONGODB_URI}`);

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Log requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.use('/api', secureRoutes);

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
