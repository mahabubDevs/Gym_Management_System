


import Trainee from '../models/trainee.model';
import Schedule from '../models/schedule.model';
import mongoose from 'mongoose';
import { MAX_TRAINEES_PER_CLASS } from '../constants/constants';



export const createTrainee = async (name: string, email: string, ) => {
  try {
    const existingTrainee = await Trainee.findOne({ email });
    if (existingTrainee) {
      throw new Error('Trainee with this email already exists.');
    }
    const trainee = new Trainee({ name, email });
    await trainee.save();
    return { success: true, statusCode: 201, message: 'Trainee created successfully', data: trainee };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getAllTrainees = async () => {
  try {
    const trainees = await Trainee.find();
    return { success: true, statusCode: 200, data: trainees };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getTraineeById = async (id: string) => {
  try {
    const trainee = await Trainee.findById(id);
    if (!trainee) {
      return { success: false, statusCode: 404, message: 'Trainee not found.' };
    }
    return { success: true, statusCode: 200, data: trainee };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const bookClass = async (traineeId: string, scheduleId: string) => {
  try {
    const trainee = await Trainee.findById(traineeId);
    const schedule = await Schedule.findById(scheduleId);

    if (!trainee || !schedule) {
      return { success: false, statusCode: 400, message: 'Invalid trainee or schedule ID.' };
    }

    if (schedule.trainees.length >= MAX_TRAINEES_PER_CLASS) {
      return {
        success: false,
        statusCode: 400,
        message: `Class schedule is full. Maximum ${MAX_TRAINEES_PER_CLASS} trainees allowed per schedule.`,
      };
    }

    if (trainee.bookedClasses.some(bookedClassId => bookedClassId.equals(new mongoose.Types.ObjectId(scheduleId)))) {
      return { success: false, statusCode: 409, message: 'You have already booked this class.' };
    }

    
    const overlappingBooking = await Schedule.findOne({
      _id: { $in: trainee.bookedClasses },
      date: schedule.date,
      $or: [
        { startTime: schedule.startTime, endTime: schedule.endTime },
        
      ],
    });

    if (overlappingBooking) {
      return { success: false, statusCode: 409, message: 'You cannot book multiple classes in the same time slot.' };
    }

    schedule.trainees.push(new mongoose.Types.ObjectId(traineeId));
    trainee.bookedClasses.push(new mongoose.Types.ObjectId(scheduleId));

    await schedule.save();
    await trainee.save();

    return {
      success: true,
      statusCode: 201,
      message: 'Class booked successfully.',
      data: { schedule },
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const cancelBooking = async (traineeId: string, scheduleId: string) => {
  try {
    const trainee = await Trainee.findById(traineeId);
    const schedule = await Schedule.findById(scheduleId);

    if (!trainee || !schedule) {
      return { success: false, statusCode: 400, message: 'Invalid trainee or schedule ID.' };
    }

    if (!trainee.bookedClasses.some(bookedClassId => bookedClassId.equals(new mongoose.Types.ObjectId(scheduleId)))) {
      return { success: false, statusCode: 400, message: 'You have not booked this class.' };
    }

    schedule.trainees = schedule.trainees.filter((id) => !id.equals(new mongoose.Types.ObjectId(traineeId)));
    trainee.bookedClasses = trainee.bookedClasses.filter((id) => !id.equals(new mongoose.Types.ObjectId(scheduleId)));

    await schedule.save();
    await trainee.save();

    return { success: true, statusCode: 200, message: 'Booking cancelled successfully.', data: { schedule } };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};



export const getTraineeBookings = async (traineeId: string) => {
  try {
  
    if (!mongoose.Types.ObjectId.isValid(traineeId)) {
      const error = new Error('Invalid Trainee ID format.');
      (error as any).statusCode = 400;
      throw error;
    }

    const trainee = await Trainee.findById(traineeId).populate('bookedClasses');
    console.log('Fetched trainee:', trainee);
    if (!trainee) {
      const error = new Error('Trainee not found.');
      (error as any).statusCode = 404;
      console.error('Throwing trainee not found error:', error);
      throw error;
    }
    return trainee.bookedClasses; 
  } catch (error: any) {
    console.error('Error fetching trainee bookings:', error);
    throw error; 
  }
};
