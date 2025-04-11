import express from 'express';
import * as TraineeController from '../controllers/trainee.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../constants/constants';

const router = express.Router();

router.post('/', authenticate, authorize(UserRole.ADMIN), TraineeController.createTrainee);
router.get('/', authenticate, authorize(UserRole.ADMIN), TraineeController.getAllTrainees);
router.get('/:id', authenticate, authorize(UserRole.ADMIN, UserRole.TRAINEE), TraineeController.getTraineeById);
router.post('/book-class', authenticate, authorize(UserRole.TRAINEE), TraineeController.bookClass);
router.post('/cancel-booking', authenticate, authorize(UserRole.TRAINEE), TraineeController.cancelBooking);


export default router;
