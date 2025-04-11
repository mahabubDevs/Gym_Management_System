import express from 'express';
import * as TrainerController from '../controllers/trainer.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../constants/constants';

const router = express.Router();

router.post('/', authenticate, authorize(UserRole.ADMIN), TrainerController.createTrainer);
router.get('/', authenticate, authorize(UserRole.ADMIN), TrainerController.getAllTrainers);
router.get('/:id', authenticate, authorize(UserRole.ADMIN), TrainerController.getTrainerById);

export default router;