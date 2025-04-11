import dotenv from 'dotenv';
dotenv.config();

const config = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/gym_management',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  port: process.env.PORT || 3000,
};

export default config;