import { Request, Response, NextFunction } from 'express';
import * as TrainerService from '../services/trainer.service';

export const createTrainer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const trainer = await TrainerService.createTrainer(name, email);
    res.status(201).json({ success: true, message: 'Trainer created successfully.', data: trainer });
  } catch (error: any) {
    next(error);
  }
};

export const getAllTrainers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trainers = await TrainerService.getAllTrainers();
    res.status(200).json({ success: true, data: trainers });
  } catch (error: any) {
    next(error);
  }
};

export const getTrainerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const trainer = await TrainerService.getTrainerById(id);
    res.status(200).json({ success: true, data: trainer });
  } catch (error: any) {
    next(error);
  }
};