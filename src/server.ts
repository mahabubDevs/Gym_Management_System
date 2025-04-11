
        import express, { Application, Request, Response, NextFunction } from 'express';
        import mongoose from 'mongoose';
        import config from './config/config';
        import authRoutes from './routes/auth.routes';
        import trainerRoutes from './routes/trainer.routes';
        import traineeRoutes from './routes/trainee.routes';
        import scheduleRoutes from './routes/schedule.routes';
        import { errorHandler } from './middlewares/error.middleware';

        const app: Application = express();
        const port = config.port;

        // Middleware
        app.use(express.json());

        // Routes
        app.use('/auth', authRoutes);
        app.use('/trainers', trainerRoutes);
        app.use('/trainees', traineeRoutes);
        app.use('/schedules', scheduleRoutes);

        // Error handling middleware
        app.use(errorHandler);

        // Connect to MongoDB
        mongoose.connect(config.mongoUri)
          .then(() => {
            console.log('Connected to MongoDB');
            app.listen(port, () => {
              console.log(`Server is running on port ${port}`);
            });
          })
          .catch((error) => {
            console.error('MongoDB connection error:', error);
          });
  
