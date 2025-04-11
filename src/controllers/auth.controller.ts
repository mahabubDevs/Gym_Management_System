import { Request, Response, NextFunction } from 'express';
import * as AuthService from '../services/auth.service';

export const registerTrainer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const result = await AuthService.registerTrainer(name, email, password);
    res.status(201).json({ success: true, message: result.message });
  } catch (error: any) {
    next(error);
  }
};

export const registerAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const result = await AuthService.registerAdmin(name, email, password);
    res.status(201).json({ success: true, message: result.message });
  } catch (error: any) {
    next(error);
  }
};

export const registerTrainee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const result = await AuthService.registerTrainee(name, email, password);
    res.status(201).json({ success: true, message: result.message });
  } catch (error: any) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.status(200).json({ success: true, message: 'Logged in successfully.', token: result.token, role: result.role, userId: result.userId });
  } catch (error: any) {
    next(error);
  }
};