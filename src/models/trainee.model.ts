import mongoose, { Schema, Document } from 'mongoose';

export interface TraineeDocument extends Document {
  name: string;
  email: string;
  password?: string;
  role: string;
  bookedClasses: mongoose.Types.ObjectId[];
}

const TraineeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,match: [/.+\@.+\..+/, 'Invalid email format.'] },
    password: { type: String },
    role: { type: String, enum: ['trainee'], default: 'trainee' },
    bookedClasses: [{ type: Schema.Types.ObjectId, ref: 'Schedule', default: [] }],
  },
  { timestamps: true }
);

const Trainee = mongoose.model<TraineeDocument>('Trainee', TraineeSchema);

export default Trainee;