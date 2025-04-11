import express from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = express.Router();

router.post('/register/trainer', AuthController.registerTrainer);
router.post('/register/admin', AuthController.registerAdmin);
router.post('/register/trainee', AuthController.registerTrainee);
router.post('/login', AuthController.login);

export default router;