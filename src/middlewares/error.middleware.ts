
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
  res.status(statusCode).json({
    success: err.success ?? false,
    message: err.message || 'Something went wrong!',
    errorDetails: err.errorDetails || undefined,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
