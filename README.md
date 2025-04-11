# Gym Class Scheduling and Membership Management System

## Project Overview

This system is designed to efficiently manage gym operations by providing a platform for scheduling classes, managing memberships, and defining user roles with specific permissions. It supports three roles: Admin, Trainer, and Trainee. Admins manage trainers and class schedules, Trainers conduct classes and view their schedules, and Trainees can manage their profiles and book available classes. The system enforces business rules such as a maximum of five classes per day, a two-hour duration for each class, and a limit of ten trainees per class schedule. JWT-based authentication ensures secure access, and robust error handling manages potential issues.




## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
-  **Environment setup**: dotenv

## Admin Credentials
- Email : admintest@gmail.com
- Password: test

## Database Schema (Mongoose Models)

```javascript
// models/Trainer and admin.model.js (Potentially merged with Trainer model)
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


// models/trainee.model.js
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

// models/schedule.model.js
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
```


## Relation Diagram

```mermaid
erDiagram
    ADMIN ||--o{ TRAINER : manages
    ADMIN ||--o{ CLASS_SCHEDULE : creates
    TRAINER ||--o{ CLASS_SCHEDULE : assigned_to
    TRAINEE ||--o{ BOOKING : makes
    CLASS_SCHEDULE ||--o{ BOOKING : has

    ADMIN {
        INT admin_id PK
        VARCHAR username
        VARCHAR password
        VARCHAR email
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    TRAINER {
        INT trainer_id PK
        VARCHAR username
        VARCHAR password
        VARCHAR email
        VARCHAR specialization
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    TRAINEE {
        INT trainee_id PK
        VARCHAR username
        VARCHAR password
        VARCHAR email
        VARCHAR name
        DATE date_of_birth
        VARCHAR contact_number
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    CLASS_SCHEDULE {
        INT schedule_id PK
        INT trainer_id FK
        VARCHAR class_name
        DATE class_date
        TIME start_time
        TIME end_time
        INT capacity
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    BOOKING {
        INT booking_id PK
        INT trainee_id FK
        INT schedule_id FK
        TIMESTAMP booking_date
        TIMESTAMP created_at
    }
```

## Instructions to Run Locally

Follow these steps to run the project on your local machine:
###  Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```
### Install Dependencies
```bash
npm install
```
### Set Environment Variables
Create a .env file in the root directory and add your environment variables. Example:
```bash
PORT=5000
DATABASE_URL=mongodb://localhost:27017/gymdb
JWT_SECRET=your_jwt_secret_key
```
### Compile TypeScript
```bash
npx tsc
```
This will compile your TypeScript code into JavaScript inside the dist/ folder.

### Start the Server
```bash
npm start
```
Server will run on:
http://localhost:3000

## Live Hosting Link
Provide the live link: https://gym-management-system-6bga.onrender.com

##  Testing Instructions

To test the core features of the Gym Management System, use the demo admin credentials below and follow the steps:

---

### 🧑‍💼 Admin Features

1. **Create Trainer**
   - Navigate to the "Create Trainer" page.
   - Fill in trainer details (name, email, password).
   - Submit to create a new trainer account.

2. **Schedule Gym Classes**
   - Go to "Schedule Classes".
   - Select a date and time (Max 5 per day).
   - Assign a trainer to the schedule.
   - Try to add more than 5 classes — you should see a validation error.

3. **Assign Trainers**
   - During class scheduling, choose a trainer from the dropdown.
   - Ensure that trainer appears in the trainer’s dashboard.

---

### 🏋️ Trainer Features

1. **View Class Schedules**
   - Log in as a trainer (use test credentials or the one created via admin).
   - Go to "My Schedules" to view assigned classes.

---

### 🧍 Trainee Features

1. **Create Profile**
   - Register as a trainee with name, email, and password.

2. **View Class Schedules**
   - After login, go to "Available Classes".

3. **Book a Class**
   - Select an available class and click "Book".
   - Try booking a class that already has 10 trainees — you should receive a booking limit error.

---

### ⚠️ Business Rule Testing

- **Admin:** Can’t schedule more than 5 classes per day.
- **Trainee:** Can’t book a class with 10 existing bookings.
- **Trainer:** Can only view their assigned classes.
- **Unauthorized Access:** Try accessing a protected route with no token or wrong role to test error handling.
