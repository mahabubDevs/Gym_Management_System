import Schedule from '../models/schedule.model';
import Trainer from '../models/trainer.model';
import mongoose from 'mongoose';
import { MAX_CLASSES_PER_DAY, MAX_TRAINEES_PER_CLASS } from '../constants/constants';

export const createSchedule = async (date: Date, startTime: string, endTime: string, trainerId: string) => {
  const existingTrainer = await Trainer.findById(trainerId);
  if (!existingTrainer) {
    throw new Error('Trainer not found.');
  }

  const existingSchedulesOnDate = await Schedule.find({ date });
  if (existingSchedulesOnDate.length >= MAX_CLASSES_PER_DAY) {
    throw new Error(`Maximum ${MAX_CLASSES_PER_DAY} schedules allowed per day.`);
  }

  const newSchedule = new Schedule({ date, startTime, endTime, trainer: trainerId });
  await newSchedule.save();
  return newSchedule;
};

export const getAllSchedules = async () => {
  return await Schedule.find().populate('trainer', 'name email').populate('trainees', 'name email');
};

export const getScheduleById = async (id: string) => {
  const schedule = await Schedule.findById(id).populate('trainer', 'name email').populate('trainees', 'name email');
  if (!schedule) {
    throw new Error('Schedule not found.');
  }
  return schedule;
};

export const updateSchedule = async (id: string, date?: Date, startTime?: string, endTime?: string, trainerId?: string) => {
  const schedule = await Schedule.findById(id);
  if (!schedule) {
    throw new Error('Schedule not found.');
  }

  if (date) schedule.date = date;
  if (startTime) schedule.startTime = startTime;
  if (endTime) schedule.endTime = endTime;
  if (trainerId) {
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      throw new Error('Trainer not found.');
    }
    // schedule.trainer = trainerId;
    schedule.trainer =new mongoose.Types.ObjectId(trainerId);
  }

  await schedule.save();
  return schedule;
};

export const deleteSchedule = async (id: string) => {
  const schedule = await Schedule.findByIdAndDelete(id);
  if (!schedule) {
    throw new Error('Schedule not found.');
  }
  return { message: 'Schedule deleted successfully.' };
};

export const getSchedulesByDate = async (date: Date) => {
  return await Schedule.find({ date }).populate('trainer', 'name email').populate('trainees', 'name email');
};