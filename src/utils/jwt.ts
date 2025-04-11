import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, config.jwtSecret);
};