import winston, { Logger as WinstonLoggerType } from 'winston';

import Logger from '../Domain/Logger';

enum Levels {
  DEBUG = 'debug',
  ERROR = 'error',
  INFO = 'info'
}

export class WinstonLogger implements Logger {
  private logger: WinstonLoggerType;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.errors({ stack: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `logs/${Levels.DEBUG}.log`, level: Levels.DEBUG }),
        new winston.transports.File({ filename: `logs/${Levels.ERROR}.log`, level: Levels.ERROR }),
        new winston.transports.File({ filename: `logs/${Levels.INFO}.log`, level: Levels.INFO })
      ]
    });
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  error(message: string | Error) {
    this.logger.error(message);
  }

  info(message: string) {
    this.logger.info(message);
  }
}
export default WinstonLogger;
