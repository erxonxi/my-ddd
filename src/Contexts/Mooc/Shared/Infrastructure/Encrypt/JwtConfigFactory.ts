import JwtConfig from '../../../../Shared/Infrastructure/Encrypt/JwtConfig';
import config from '../Config';

export class JwtConfigFactory {
  static createConfig(): JwtConfig {
    return {
      secret: config.get('jwt.secret')
    };
  }
}
