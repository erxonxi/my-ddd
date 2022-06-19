import { Router, Request, Response } from 'express';
import HTTP_STATUS_CODES from 'http-status';

export const register = (router: Router) => {
  router.get('/status', (req: Request, res: Response) => {
    res.status(HTTP_STATUS_CODES.OK).json({ message: 'Mooc Service is Ok!' })
  });
};