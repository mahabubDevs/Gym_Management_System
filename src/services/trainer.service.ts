import Trainer from '../models/trainer.model';

export const createTrainer = async (name: string, email: string) => {
  const existingTrainer = await Trainer.findOne({ email });
  if (existingTrainer) {
    throw new Error('Trainer with this email already exists.');
  }
  const trainer = new Trainer({ name, email });
  await trainer.save();
  return trainer;
};

export const getAllTrainers = async () => {
  return await Trainer.find();
};

export const getTrainerById = async (id: string) => {
  const trainer = await Trainer.findById(id);
  if (!trainer) {
    throw new Error('Trainer not found.');
  }
  return trainer;
};