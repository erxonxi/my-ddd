import MongoConfig from '../../../../../Shared/Infrastructure/Mongo/MongoConfig';
import config from '../../Config';

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: config.get('mongo.url')
    };
  }
}
