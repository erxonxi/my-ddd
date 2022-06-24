import { Response, Controller, Get } from '@decorators/express';
import { Response as IResponse } from 'express';

@Controller('/status')
export class StatusController {
  @Get('/')
  public status(@Response() res: IResponse) {
    res.status(200).send({ message: 'Service running...' });
  }
}
