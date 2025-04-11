import mongoose, { Schema, Document } from 'mongoose';

export interface ScheduleDocument extends Document {
  date: Date;
  startTime: string;
  endTime: string;
  trainer: mongoose.Types.ObjectId;
  trainees: mongoose.Types.ObjectId[];
}

const ScheduleSchema: Schema = new Schema(
  {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    trainer: { type: Schema.Types.ObjectId, ref: 'Trainer', required: true },
    trainees: [{ type: Schema.Types.ObjectId, ref: 'Trainee', default: [] }],
  },
  { timestamps: true }
);

const Schedule = mongoose.model<ScheduleDocument>('Schedule', ScheduleSchema);

export default Schedule;