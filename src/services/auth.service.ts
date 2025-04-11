
import Trainer, { TrainerDocument } from '../models/trainer.model';
import Trainee, { TraineeDocument } from '../models/trainee.model';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { UserRole } from '../constants/constants';

const SALT_ROUNDS = 10;


export const registerTrainer = async (name: string, email: string, password?: string) => {
  try {
    const existingTrainer = await Trainer.findOne({ email });
    if (existingTrainer) {
      throw new Error('Trainer with this email already exists.');
    }

    const hashedPassword = password ? await bcrypt.hash(password, SALT_ROUNDS) : undefined;
    const trainer = new Trainer({ name, email, password: hashedPassword, role: UserRole.TRAINER });
    await trainer.save();

    return { message: 'Trainer registered successfully.' };
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }

      
      let formattedErrorDetails: any;
      const errorFields = Object.keys(errors);

      if (errorFields.length === 1) {
        const field = errorFields[0];
        formattedErrorDetails = {
          field: field,
          message: errors[field],
        };
      } else {
       
        formattedErrorDetails = errorFields.reduce((acc, field) => {
          acc[field] = {
            field,
            message: errors[field],
          };
          return acc;
        }, {} as Record<string, { field: string; message: string }>);
      }

     
      throw {
        success: false,
        message: 'Validation error occurred.',
        errorDetails: formattedErrorDetails,
      };
    }

 
    throw {
      success: false,
      message: error.message || 'Something went wrong.',
    };
  }
};




export const registerAdmin = async (name: string, email: string, password?: string) => {
  try {
    const existingAdmin = await Trainer.findOne({ email });
    if (existingAdmin) {
      throw new Error('Admin with this email already exists.');
    }

    const hashedPassword = password ? await bcrypt.hash(password, SALT_ROUNDS) : undefined;
    const admin = new Trainer({ name, email, password: hashedPassword, role: UserRole.ADMIN });
    await admin.save();

    return { message: 'Admin registered successfully.' };
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }

      let formattedErrorDetails: any;
      const errorFields = Object.keys(errors);

      if (errorFields.length === 1) {
        const field = errorFields[0];
        formattedErrorDetails = {
          field,
          message: errors[field],
        };
      } else {
        formattedErrorDetails = errorFields.reduce((acc, field) => {
          acc[field] = {
            field,
            message: errors[field],
          };
          return acc;
        }, {} as Record<string, { field: string; message: string }>);
      }

      throw {
        success: false,
        message: 'Validation error occurred.',
        errorDetails: formattedErrorDetails,
      };
    }

    throw {
      success: false,
      message: error.message || 'Something went wrong.',
    };
  }
};

export const registerTrainee = async (name: string, email: string, password?: string) => {
  try {
    const existingTrainee = await Trainee.findOne({ email });
    if (existingTrainee) {
      throw new Error('Trainee with this email already exists.');
    }

    const hashedPassword = password ? await bcrypt.hash(password, SALT_ROUNDS) : undefined;
    const trainee = new Trainee({ name, email, password: hashedPassword });
    await trainee.save();

    return { message: 'Trainee registered successfully.' };
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }

      let formattedErrorDetails: any;
      const errorFields = Object.keys(errors);

      if (errorFields.length === 1) {
        const field = errorFields[0];
        formattedErrorDetails = {
          field,
          message: errors[field],
        };
      } else {
        formattedErrorDetails = errorFields.reduce((acc, field) => {
          acc[field] = {
            field,
            message: errors[field],
          };
          return acc;
        }, {} as Record<string, { field: string; message: string }>);
      }

      throw {
        success: false,
        message: 'Validation error occurred.',
        errorDetails: formattedErrorDetails,
      };
    }

    throw {
      success: false,
      message: error.message || 'Something went wrong.',
    };
  }
};

export const login = async (email: string, password?: string) => {
  try {
    let user: TrainerDocument | TraineeDocument | null = await Trainer.findOne({ email });
    let role: UserRole = UserRole.TRAINER;

    if (!user) {
      user = await Trainee.findOne({ email });
      role = UserRole.TRAINEE;
      if (!user) {
        throw {
          success: false,
          message: 'Invalid credentials.',
        };
      }
    }

    if (user.password && password) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw {
          success: false,
          message: 'Invalid credentials.',
        };
      }
    } else if (user.password && !password) {
      throw {
        success: false,
        message: 'Password is required.',
        errorDetails: {
          field: 'password',
          message: 'Password must be provided.',
        },
      };
    }

    const tokenPayload = { id: user._id, role: user.role || role };
    const token = generateToken(tokenPayload);

    return {
      token,
      role,
      userId: user._id,
    };
  } catch (error: any) {
 
    if (error.success === false) {
      throw error;
    }

  
    throw {
      success: false,
      message: error.message || 'Login failed.',
    };
  }
};

