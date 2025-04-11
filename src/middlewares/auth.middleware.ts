import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { UserRole } from '../constants/constants';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}



export const authenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = verifyToken(token) as { id: string; role: string };
      req.user = { id: decoded.id, role: decoded.role };
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }
  };




export const authorize = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    
    if (!req.user || !roles.includes(req.user.role as UserRole)) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access.',
        errorDetails: `You must be a ${roles.join(' or ')} to perform this action.`,
      });
    }
    next();
  };
};