# Gym Class Scheduling and Membership Management System

## Project Overview

This system is designed to efficiently manage gym operations by providing a platform for scheduling classes, managing memberships, and defining user roles with specific permissions. It supports three roles: Admin, Trainer, and Trainee. Admins manage trainers and class schedules, Trainers conduct classes and view their schedules, and Trainees can manage their profiles and book available classes. The system enforces business rules such as a maximum of five classes per day, a two-hour duration for each class, and a limit of ten trainees per class schedule. JWT-based authentication ensures secure access, and robust error handling manages potential issues.




## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt

  ##  API Endpoints
  All endpoints are prefixed with:
  BASE_URL = http://localhost:3000

  
---

###  Auth Routes

#### POST `/auth/register/trainer`
#### POST `/auth//register/adminr`
#### POST `/auth/register/trainee`

Registers a new (trainee, admin, trainer) user.

```json
Request Body:
{
  "name": "Mahabub Rahman",
  "email": "mahabub@example.com",
  "password": "123456"
}
Response:
{
    "success": true,
    "message": "Trainer registered successfully."
}
```
#### POST `/auth/login`
Login a  (trainee, admin, trainer) user.
  ```json
Request Body:
{
    "email": "mahabub@gmail.com",
    "password": "123456"
}
Response:
{
    "success": true,
    "message": "Logged in successfully.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Zjc3NTNiYTFjYjcxYTNkODkyZGY3YSIsInJvbGUiOiJ0cmFpbmVlIiwiaWF0IjoxNzQ0Mzc1MTkyLCJleHAiOjE3NDQzNzg3OTJ9.i2sq6M_c2W3ESXirhftmepi_dua5v34Ck4XsXnBKmRY",
    "role": "trainee",
    "userId": "67f7753ba1cb71a3d892df7a"
}

```

### Trainer Routes
#### POST `/trainers`
create a trainers 

```json
Headers:
Authorization: Bearer <trainer_token>
```

```json
Request Body:
{
    "name": "test Trainer",
    "email": "testTrainer@gmail.com",
    "password": "test"
}
Response:
{
    "success": true,
    "message": "Trainer created successfully.",
    "data": {
        "name": "test Trainer",
        "email": "testTrainer@gmail.com",
        "password": "$2b$10$wZvjcKhuHcA2oFtvxdOBdef447z3t3Xe8XHjW1bb/mESv/mUaA62G"
        "role": "trainer",
        "_id": "67f8e46ee24ecc13203af2f6",
        "createdAt": "2025-04-11T09:44:14.422Z",
        "updatedAt": "2025-04-11T09:44:14.422Z",
        "__v": 0
    }
}

```

#### GET `/trainers`
get all trainers list
```json
Headers:
Authorization: Bearer <trainer_token>
```

```json
Response:

{
    "success": true,
    "data": [
        {
            "_id": "67f76de18c327ee04c808871",
            "name": "mahabub",
            "email": "test@gmail.com",
            "password": "$2b$10$HvDDvaRrNIslkGMLrsrWbeytXVum1GLWuv9Iedy6xpbp0QWnsxsgi",
            "role": "trainer",
            "createdAt": "2025-04-10T07:06:09.923Z",
            "updatedAt": "2025-04-10T07:06:09.923Z",
            "__v": 0
        },
        {
            "_id": "67f774b7a1cb71a3d892df73",
            "name": "mahabub",
            "email": "test1@gmail.com",
            "password": "$2b$10$4w64Wub5aRFzfDCRQUmMH.JQZMXKUN.JyJ3GgoIpvVx1J0lCN7J.i",
            "role": "trainer",
            "createdAt": "2025-04-10T07:35:19.500Z",
            "updatedAt": "2025-04-10T07:35:19.500Z",
            "__v": 0
        },
  ]
}

```
#### GET `/trainers/:id`
id use get trainers
```json
Headers:
Authorization: Bearer <trainer_token>
```

```json
Response: 
{
    "success": true,
    "data": {
        "_id": "67f76de18c327ee04c808871",
        "name": "mahabub",
        "email": "test@gmail.com",
        "password": "$2b$10$HvDDvaRrNIslkGMLrsrWbeytXVum1GLWuv9Iedy6xpbp0QWnsxsgi",
        "role": "trainer",
        "createdAt": "2025-04-10T07:06:09.923Z",
        "updatedAt": "2025-04-10T07:06:09.923Z",
        "__v": 0
    }
}
```

### Trainee Routes
#### POST `/trainees`
create a trainees
```json
Headers:
Authorization: Bearer <trainer_token>
```

```json
Request body:
{
    "name": "new trainees 2",
    "email": "newtrainees2@gmail.com",
    "password": "test"
}
Response:
{
    "success": true,
    "message": "Trainee created successfully.",
    "data": {
        "success": true,
        "statusCode": 201,
        "message": "Trainee created successfully",
        "data": {
            "name": "new trainees 2",
            "email": "newtrainees2@gmail.com",
            "role": "trainee",
            "bookedClasses": [],
            "_id": "67f8ea39a8294b107edb3e9b",
            "createdAt": "2025-04-11T10:08:57.792Z",
            "updatedAt": "2025-04-11T10:08:57.792Z",
            "__v": 0
        }
    }
}

```
#### GET `/trainees`
get all trainees list
```json
Headers:
Authorization: Bearer <trainer_token>
```

```json
Response:
{
    "success": true,
    "data": {
        "success": true,
        "statusCode": 200,
        "data": [
            {
                "_id": "67f7753ba1cb71a3d892df7a",
                "name": "mahabub",
                "email": "test1111@gmail.com",
                "password": "$2b$10$E8yRu7Q4HDBxOzoDXELk1uGWI.c645YeROtEClbZk/B9sbch3d5Za",
                "role": "trainee",
                "bookedClasses": [],
                "createdAt": "2025-04-10T07:37:31.567Z",
                "updatedAt": "2025-04-10T07:37:31.567Z",
                "__v": 0
            },
            {
                "_id": "67f8771e7c56af1f3131ffb9",
                "name": "new Trainee",
                "email": "trainee@gmail.com",
                "password": "$2b$10$6Xloe5lnPQ0V4ClQN/Bx/eoZJVjj2jaDam.rr4DQSiKGiN9BZrpHu",
                "role": "trainee",
                "bookedClasses": [],
                "createdAt": "2025-04-11T01:57:50.452Z",
                "updatedAt": "2025-04-11T01:57:50.452Z",
                "__v": 0
            },
            
        ]
    }
}
```
#### GET `/trainees/:id`
single trainees get 
```json
Headers:
Authorization: Bearer <trainer_token>
```

```json
Response:

{
    "success": true,
    "data": {
        "success": true,
        "statusCode": 200,
        "data": [
            {
                "_id": "67f7753ba1cb71a3d892df7a",
                "name": "mahabub",
                "email": "test1111@gmail.com",
                "password": "$2b$10$E8yRu7Q4HDBxOzoDXELk1uGWI.c645YeROtEClbZk/B9sbch3d5Za",
                "role": "trainee",
                "bookedClasses": [],
                "createdAt": "2025-04-10T07:37:31.567Z",
                "updatedAt": "2025-04-10T07:37:31.567Z",
                "__v": 0
            },
          
        ]
    }
}
```

#### POST `/trainees/book-class`
trainees create a class-book
```json
Headers:
Authorization: Bearer <trainer_token>
```

```json
Request body:
{
    "scheduleId": "67f8e096f6fcc959ce017cfc"
}

Response:

{
    "success": true,
    "statusCode": 201,
    "message": "Class booked successfully.",
    "Data": {
        "schedule": {
            "_id": "67f8e096f6fcc959ce017cfc",
            "date": "2025-12-03T18:00:00.000Z",
            "startTime": "4:00 pm",
            "endTime": "6:00pm",
            "trainer": "67f876847c56af1f3131ffab",
            "trainees": [
                "67f8771e7c56af1f3131ffb9"
            ],
            "createdAt": "2025-04-11T09:27:50.218Z",
            "updatedAt": "2025-04-11T10:32:23.468Z",
            "__v": 1
        }
    }
}

```
#### POST `/trainees/cancel-booking`
trainees cancel booking 
```json
Headers:
Authorization: Bearer <trainer_token>
```

```json
Request body:
{
    "scheduleId": "67f8e096f6fcc959ce017cfc"
}

Response:

{
    "success": true,
    "message": "Booking cancelled successfully.",
    "Data": {
        "schedule": {
            "_id": "67f8e20cf6fcc959ce017d02",
            "date": "2025-12-04T00:00:00.000Z",
            "startTime": "4:00 pm",
            "endTime": "6:00pm",
            "trainer": "67f876847c56af1f3131ffab",
            "trainees": [],
            "createdAt": "2025-04-11T09:34:04.745Z",
            "updatedAt": "2025-04-11T10:22:41.629Z",
            "__v": 2
        }
    }
}

```
### Schedule Routes
### POST `/schedules`
create a class schedules

```json
Headers:
Authorization: Bearer <trainer_token>
```
```json
Request body:
{
    "date": "2025-12-04",
    "startTime": "4:00 pm",
    "endTime": "6:00pm",
    "trainerId": "67f876847c56af1f3131ffab"

}

Response:

{
    "success": true,
    "message": "Schedule created successfully.",
    "data": {
        "date": "2025-12-04T00:00:00.000Z",
        "startTime": "4:00 pm",
        "endTime": "6:00pm",
        "trainer": "67f876847c56af1f3131ffab",
        "trainees": [],
        "_id": "67f8e20cf6fcc959ce017d02",
        "createdAt": "2025-04-11T09:34:04.745Z",
        "updatedAt": "2025-04-11T09:34:04.745Z",
        "__v": 0
    }
}
```
#### GET `/schedules`
get all Schedules see there

```json
Headers:
Authorization: Bearer <trainer_token>
```
```json
Response:
{
    "success": true,
    "data": [
        {
            "_id": "67f87b8b7c56af1f3131ffc3",
            "date": "2025-12-03T18:00:00.000Z",
            "startTime": "4:00 pm",
            "endTime": "6:00pm",
            "trainer": {
                "_id": "67f876847c56af1f3131ffab",
                "name": "new Trainer",
                "email": "trainer21@gmail.com"
            },
            "trainees": [],
            "createdAt": "2025-04-11T02:16:43.749Z",
            "updatedAt": "2025-04-11T02:16:43.749Z",
            "__v": 0
        }
    ]
}
```
#### GET `/schedules/:id`
singel id search schedules
```json
Headers:
Authorization: Bearer <trainer_token>
```
```json
{
    "success": true,
    "data": [
        {
            "_id": "67f87b8b7c56af1f3131ffc3",
            "date": "2025-12-03T18:00:00.000Z",
            "startTime": "4:00 pm",
            "endTime": "6:00pm",
            "trainer": {
                "_id": "67f876847c56af1f3131ffab",
                "name": "new Trainer",
                "email": "trainer21@gmail.com"
            },
            "trainees": [],
            "createdAt": "2025-04-11T02:16:43.749Z",
            "updatedAt": "2025-04-11T02:16:43.749Z",
            "__v": 0
        }
    ]
}
```
#### PUT `/schedules/:id`
update Schedule
```json
Headers:
Authorization: Bearer <trainer_token>
```
```json
Request body:
{
    "date": "12-04-2025",
    "startTime": "5:00 pm",
    "endTime": "7:00pm",
    "trainerId": "67f876847c56af1f3131ffab"

}

Response:
{
    "success": true,
    "message": "Schedule updated successfully.",
    "data": {
        "_id": "67f87b8b7c56af1f3131ffc3",
        "date": "2025-12-03T18:00:00.000Z",
        "startTime": "5:00 pm",
        "endTime": "7:00pm",
        "trainer": "67f876847c56af1f3131ffab",
        "trainees": [],
        "createdAt": "2025-04-11T02:16:43.749Z",
        "updatedAt": "2025-04-11T09:25:48.615Z",
        "__v": 0
    }
}
```
#### DEL `/schedules/:id`
delete schedule
```json
Headers:
Authorization: Bearer <trainer_token>
```

```json
Response:
{
    "success": true,
    "message": "Schedule deleted successfully."
}
```
#### GET `/schedules/date/:date`
date use search schedules
```json
Headers:
Authorization: Bearer <trainer_token>
```
```json
Response:
{
    "success": true,
    "data": [
        {
            "_id": "67f8e20cf6fcc959ce017d02",
            "date": "2025-12-04T00:00:00.000Z",
            "startTime": "4:00 pm",
            "endTime": "6:00pm",
            "trainer": {
                "_id": "67f876847c56af1f3131ffab",
                "name": "new Trainer",
                "email": "trainer21@gmail.com"
            },
            "trainees": [],
            "createdAt": "2025-04-11T09:34:04.745Z",
            "updatedAt": "2025-04-11T09:34:04.745Z",
            "__v": 0
        }
    ]
}
```















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
