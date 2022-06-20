import { Request, Response } from 'express';
import HTTP_STATUS_CODES from 'http-status';

import { Controller } from './Controller';

export default class StatusGetController implements Controller {
  async run(req: Request, res: Response) {
    res.status(HTTP_STATUS_CODES.OK).json({ message: 'Mooc Service is Ok!' });
  }
}