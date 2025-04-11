import mongoose, { Schema, Document } from 'mongoose';

export interface TrainerDocument extends Document {
  name: string;
  email: string;
  password?: string;
  role: string;
}

const TrainerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true ,match: [/.+\@.+\..+/, 'Invalid email format.']},
    password: { type: String },
    role: { type: String, enum: ['admin', 'trainer'], default: 'trainer' },
    
  },
  { timestamps: true }
);

const Trainer = mongoose.model<TrainerDocument>('Trainer', TrainerSchema);

export default Trainer;