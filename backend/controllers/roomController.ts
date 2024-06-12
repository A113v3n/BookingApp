// backend/controllers/roomController.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Room from '../models/Room';
import Location from '../models/Location';

export const getRooms = async (req: Request, res: Response) => {
  console.log('GET /api/room/ - Fetching all rooms');
  try {
    const rooms = await Room.find().populate('location');
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  console.log(`GET /api/room/${req.params.id} - Fetching room by ID`);
  try {
    const room = await Room.findById(req.params.id).populate('location');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json(room);
  } catch (error) {
    console.error(`Error fetching room by ID (${req.params.id}):`, error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  console.log('POST /api/room/ - Creating a new room');
  const { name, location, capacity, available } = req.body;
  try {
    // Check if the location exists
    const existingLocation = await Location.findById(location);
    if (!existingLocation) {
      return res.status(400).json({ message: 'Invalid location ID' });
    }

    const newRoom = new Room({ name, location, capacity, available });
    await newRoom.save();

    // Add room to the location's rooms list
    existingLocation.rooms.push(newRoom._id as mongoose.Types.ObjectId);
    await existingLocation.save();

    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  console.log(`DELETE /api/room/${req.params.id} - Deleting room by ID`);
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Remove room from the location's rooms list
    await Location.findByIdAndUpdate(room.location, {
      $pull: { rooms: room._id as mongoose.Types.ObjectId },
    });

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(`Error deleting room by ID (${req.params.id}):`, error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
