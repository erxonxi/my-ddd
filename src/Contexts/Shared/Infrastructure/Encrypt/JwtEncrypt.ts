import jwt from 'jsonwebtoken';
import JwtConfig from './JwtConfig';

export class JwtEncrypt {
  private secret: string;

  constructor(config: JwtConfig) {
    this.secret = config.secret;
  }

  encrypt(data: object): string {
    return jwt.sign(data, this.secret, { expiresIn: 60 * 60 * 24 });
  }

  verify(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch {
      return false;
    }
  }
}
