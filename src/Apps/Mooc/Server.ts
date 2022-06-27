/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import bodyParser from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { Request, Response, Router as IRouter } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';

import { registerRoutes } from './Routes';
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import container from './Injections';
import { UserRepository } from '../../Contexts/Mooc/Users/Domain/UserRepository';
import { Filters } from '../../Contexts/Shared/Domain/Criteria/Filters';
import { Order } from '../../Contexts/Shared/Domain/Criteria/Order';
import { Criteria } from '../../Contexts/Shared/Domain/Criteria/Criteria';
import { User } from '../../Contexts/Mooc/Users/Domain/User';
import { UserId } from '../../Contexts/Mooc/Users/Domain/UserId';
import config from '../../Contexts/Mooc/Shared/Infrastructure/Config';
import cors from 'cors';

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(compress());
    this.express.use(cors({ origin: config.get('cors.origin'), credentials: true }));
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);

    this.oauth(router);

    registerRoutes(router);
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `[*] Mock Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        );
        console.log('[*] Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }

  private oauth(router: IRouter) {
    router.use(cookieParser());
    router.use(session({ secret: 'SECRET', resave: true, saveUninitialized: true })); // session secret
    router.use(passport.initialize());
    router.use(passport.session());

    router.get('/user', (req: Request, res: Response) => {
      res.status(httpStatus.OK).json(req.user);
    });

    passport.serializeUser((user: any, done: any) => {
      done(null, user);
    });

    passport.deserializeUser((user: any, done: any) => {
      done(null, user);
    });

    passport.use(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      new GitHubStrategy(
        {
          clientID: config.get('github.clientId'),
          clientSecret: config.get('github.clientSecret'),
          callbackURL: '/auth/github/callback'
        },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
          const repository = container.get('Mooc.Users.Repository') as UserRepository;
          const filters = Filters.fromValues([
            new Map([
              ['field', 'githubId'],
              ['operator', '='],
              ['value', profile.id]
            ])
          ]);
          const order = Order.fromValues();
          const criteria = new Criteria(filters, order);
          const res = await repository.find(criteria);

          if (res.length > 0) return done(null, res[0].toPrimitives());

          const user = User.fromPrimitives({
            id: UserId.random().value,
            name: profile.username,
            email: '',
            password: '',
            githubId: profile.id
          });
          await repository.save(user);

          return done(null, user.toPrimitives());
        }
      )
    );

    router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

    router.get(
      '/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/login' }),
      (req: Request, res: Response) => {
        res.redirect('http://localhost:3000/');
      }
    );
  }
}
