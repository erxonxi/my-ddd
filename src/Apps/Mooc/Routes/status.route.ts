import { Router, Request, Response } from 'express';

import container from '../Injections';
import StatusGetController from '../Controllers/StatusGetController';

export const register = (router: Router) => {
  const StatusGetController = container.get('Apps.Mooc.Controllers.StatusGetController') as StatusGetController

  router.get('/status', (req: Request, res: Response) => StatusGetController.run(req, res));
};
