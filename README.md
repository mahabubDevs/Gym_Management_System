# Gym Class Scheduling and Membership Management System

## Project Overview

This system is designed to efficiently manage gym operations by providing a platform for scheduling classes, managing memberships, and defining user roles with specific permissions. It supports three roles: Admin, Trainer, and Trainee. Admins manage trainers and class schedules, Trainers conduct classes and view their schedules, and Trainees can manage their profiles and book available classes. The system enforces business rules such as a maximum of five classes per day, a two-hour duration for each class, and a limit of ten trainees per class schedule. JWT-based authentication ensures secure access, and robust error handling manages potential issues.




## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
-  **Password Hashing**: dotenv



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



