// backend/controllers/locationController.ts
import { Request, Response } from 'express';
import Location from '../models/Location';

export const getLocations = async (req: Request, res: Response) => {
  console.log('GET /api/location/ - Fetching all locations');
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getLocationById = async (req: Request, res: Response) => {
  console.log(`GET /api/location/${req.params.id} - Fetching location by ID`);
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json(location);
  } catch (error) {
    console.error(`Error fetching location by ID (${req.params.id}):`, error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createLocation = async (req: Request, res: Response) => {
  console.log('POST /api/location/ - Creating a new location');
  const { name, address, city, state, zip, attendants } = req.body;
  try {
    const newLocation = new Location({ name, address, city, state, zip, attendants });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  console.log(`DELETE /api/location/${req.params.id} - Deleting location by ID`);
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error(`Error deleting location by ID (${req.params.id}):`, error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
