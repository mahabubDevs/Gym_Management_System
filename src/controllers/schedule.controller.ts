import { Request, Response, NextFunction } from 'express';
import * as ScheduleService from '../services/schedule.service';

export const createSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, startTime, endTime, trainerId } = req.body;
    const newDate = new Date(date);
    const schedule = await ScheduleService.createSchedule(newDate, startTime, endTime, trainerId);
    res.status(201).json({ success: true, message: 'Schedule created successfully.', data: schedule });
  } catch (error: any) {
    if (error.message.startsWith('Maximum')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

export const getAllSchedules = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schedules = await ScheduleService.getAllSchedules();
    res.status(200).json({ success: true, data: schedules });
  } catch (error: any) {
    next(error);
  }
};

export const getScheduleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const schedule = await ScheduleService.getScheduleById(id);
    res.status(200).json({ success: true, data: schedule });
  } catch (error: any) {
    next(error);
  }
};

export const updateSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { date, startTime, endTime, trainerId } = req.body;
    const updatedSchedule = await ScheduleService.updateSchedule(id, date ? new Date(date) : undefined, startTime, endTime, trainerId);
    res.status(200).json({ success: true, message: 'Schedule updated successfully.', data: updatedSchedule });
  } catch (error: any) {
    next(error);
  }
};

export const deleteSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await ScheduleService.deleteSchedule(id);
    res.status(200).json({ success: true, message: result.message });
  } catch (error: any) {
    next(error);
  }
};

export const getSchedulesByDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.params;
    const searchDate = new Date(date);
    const schedules = await ScheduleService.getSchedulesByDate(searchDate);
    res.status(200).json({ success: true, data: schedules });
  } catch (error: any) {
    next(error);
  }
};