import bodyParser from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';

import { registerRoutes } from './Routes';
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
}
