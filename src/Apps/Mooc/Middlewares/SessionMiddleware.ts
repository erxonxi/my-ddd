import { Middleware } from '@decorators/express';
import { Request, Response, NextFunction } from 'express';
import container from '../Injections';
import { JwtEncrypt } from '../../../Contexts/Shared/Infrastructure/Encrypt/JwtEncrypt';
import { Session } from '../../../Contexts/Shared/Domain/Auth/Session';

export interface IRequestAuthenticated extends Request {
  userSession: Session;
}

export class SessionMiddleware implements Middleware {
  public use(req: IRequestAuthenticated, res: Response, next: NextFunction): void {
    const jwt = container.get('Shared.JwtEncrypt') as JwtEncrypt;
    try {
      const bearerHeader = req.headers['authorization'];

      if (!bearerHeader) {
        res.status(404).json({ message: 'Unauthorized' });
        return;
      }

      const token = bearerHeader.split(' ')[1];

      const session = jwt.verify(token);

      if (!session) {
        res.status(404).json({ message: 'Unauthorized' });
        return;
      }

      req.userSession = session;
      next();
    } catch (e) {
      res.status(404).json({ message: 'Unauthorized' });
    }
  }
}
