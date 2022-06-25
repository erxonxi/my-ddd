import MongoConfig from '../../../../../Shared/Infrastructure/Mongo/MongoConfig';

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: 'mongodb://localhost'
    };
  }
}
