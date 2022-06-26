/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import bodyParser from 'body-parser';
// import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { Router as IRouter, Request, Response } from 'express';
import Router from 'express-promise-router';
import session from 'express-session';
// import helmet from 'helmet';
import * as http from 'http';
// import httpStatus from 'http-status';

import { registerRoutes } from './Routes';
import passport from 'passport';
import cors from 'cors';
import container from './Injections';
import { UserRepository } from '../../Contexts/Mooc/Users/Domain/UserRepository';
import { UserId } from '../../Contexts/Mooc/Users/Domain/UserId';
import GitHubStrategy from 'passport-github';
import config from '../../Contexts/Mooc/Shared/Infrastructure/Config';
import { Criteria } from '../../Contexts/Shared/Domain/Criteria/Criteria';
import { Filters } from '../../Contexts/Shared/Domain/Criteria/Filters';
import { Order } from '../../Contexts/Shared/Domain/Criteria/Order';
import { User } from '../../Contexts/Mooc/Users/Domain/User';
import { randomUUID } from 'crypto';

export class Server {
  private express: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    // this.express.use(helmet.xssFilter());
    // this.express.use(helmet.noSniff());
    // this.express.use(helmet.hidePoweredBy());
    // this.express.use(helmet.frameguard({ action: 'deny' }));
    // this.express.use(compress());
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);

    this.express.use(cors({ origin: '*', credentials: true }));

    this.passport(router);

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

  private passport(router: IRouter) {
    router.use(
      session({
        secret: 'secret-code',
        resave: true,
        saveUninitialized: true
      })
    );

    this.express.use(passport.initialize());
    this.express.use(passport.session());

    passport.serializeUser((user: any, done: any) => done(null, user));

    passport.deserializeUser((id: string, done: any) => {
      console.log(id);
      const repository = container.get('Mooc.Users.Repository') as UserRepository;
      repository.search(new UserId(id)).then(res => done(null, res?.toPrimitives()));
    });

    passport.use(
      new GitHubStrategy(
        {
          clientID: config.get('github.client_id'),
          clientSecret: config.get('github.client_secret'),
          callbackURL: '/oauth/github/callback'
        },
        (_: any, __: any, profile: any, cb: any) => {
          const repository = container.get('Mooc.Users.Repository') as UserRepository;
          repository
            .find(
              new Criteria(
                Filters.fromValues([
                  new Map([
                    ['field', 'githubId'],
                    ['operator', '='],
                    ['value', profile.id]
                  ])
                ]),
                Order.fromValues()
              )
            )
            .then(res => {
              if (res.length > 0) {
                cb(null, res[0].toPrimitives());
                return;
              }

              const userCreated = User.fromPrimitives({
                githubId: profile.id,
                name: profile.username,
                email: '',
                password: '',
                id: randomUUID().toString()
              });

              repository.save(userCreated).then(res => {
                cb(null, userCreated.toPrimitives());
              });
            });
        }
      )
    );

    router.get('/oauth/github', passport.authenticate('github'));

    router.get(
      '/oauth/github/callback',
      passport.authenticate('github', { failureRedirect: '/error', session: true }),
      (req: Request, res: Response) => {
        // console.log(req.user);
        res.status(200);
        // res.redirect('/user');
      }
    );

    router.get('/user', (req: Request, res: Response) => {
      console.log(req.user);
      res.status(200).send(JSON.stringify(req.user));
    });
  }
}
