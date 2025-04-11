import express from 'express';
import * as ScheduleController from '../controllers/schedule.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../constants/constants';

const router = express.Router();

router.post('/', authenticate, authorize(UserRole.ADMIN), ScheduleController.createSchedule);
router.get('/', authenticate, authorize(UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE), ScheduleController.getAllSchedules);
router.get('/:id', authenticate, authorize(UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE), ScheduleController.getScheduleById);
router.put('/:id', authenticate, authorize(UserRole.ADMIN), ScheduleController.updateSchedule);
router.delete('/:id', authenticate, authorize(UserRole.ADMIN), ScheduleController.deleteSchedule);
router.get('/date/:date', authenticate, authorize(UserRole.ADMIN, UserRole.TRAINER, UserRole.TRAINEE), ScheduleController.getSchedulesByDate);

export default router;