import { Request, Response, NextFunction } from 'express';
import * as TraineeService from '../services/trainee.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const createTrainee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email  } = req.body;
    const trainee = await TraineeService.createTrainee(name, email );
    res.status(201).json({ success: true, message: 'Trainee created successfully.', data: trainee });
  } catch (error: any) {
    next(error);
  }
};

export const getAllTrainees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trainees = await TraineeService.getAllTrainees();
    res.status(200).json({ success: true, data: trainees });
  } catch (error: any) {
    next(error);
  }
};

export const getTraineeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const trainee = await TraineeService.getTraineeById(id);
    res.status(200).json({ success: true, data: trainee });
  } catch (error: any) {
    next(error);
  }
};

export const bookClass = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const traineeId = req.user?.id;
    const { scheduleId } = req.body;
    if (!traineeId) {
      return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }
    const result = await TraineeService.bookClass(traineeId, scheduleId);
    res.status(201).json({ success: true, statusCode: 201, message: result.message, Data: result.data });
  } catch (error: any) {
    if (error.message === 'Class schedule is full. Maximum 10 trainees allowed per schedule.') {
      return res.status(400).json({ success: false, message: error.message });
    } else if (error.message === 'You have already booked this class.' || error.message === 'You cannot book multiple classes in the same time slot.') {
      return res.status(409).json({ success: false, message: error.message });
    }
    next(error);
  }
};

export const cancelBooking = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const traineeId = req.user?.id;
    const { scheduleId } = req.body;
    if (!traineeId) {
      return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }
    const result = await TraineeService.cancelBooking(traineeId, scheduleId);
    res.status(200).json({ success: true, message: result.message, Data: result.data });
  } catch (error: any) {
    next(error);
  }
};



