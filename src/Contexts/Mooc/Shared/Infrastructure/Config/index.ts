import convict from 'convict';

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  mongo: {
    url: {
      doc: 'The MongoDB connection URL',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://localhost:27017/mooc-backend-dev'
    }
  },
  rabbitMQ: {
    host: {
      doc: 'The RabbitMQ connection host',
      format: String,
      env: 'RABBITMQ_HOST',
      default: 'localhost'
    },
    user: {
      doc: 'The RabbitMQ connection user',
      format: String,
      env: 'RABBITMQ_DEFAULT_USER',
      default: 'guest'
    },
    password: {
      doc: 'The RabbitMQ connection password',
      format: String,
      env: 'RABBITMQ_DEFAULT_PASS',
      default: 'guest'
    },
    queue: {
      doc: 'Queue where subscribers listen on',
      format: String,
      env: 'RABBITMQ_QUEUE',
      default: 'Mooc.DomainEvents'
    },
    exchange: {
      doc: 'Exchange where events are published',
      format: String,
      env: 'RABBITMQ_EXCHANGE',
      default: 'DomainEvents'
    }
  },
  github: {
    clientId: {
      doc: 'The GitHub ID',
      format: String,
      env: 'GITHUB_CLIENT_ID',
      default: ''
    },
    clientSecret: {
      doc: 'The GitHub Secret',
      format: String,
      env: 'GITHUB_CLIENT_SECRET',
      default: ''
    }
  },
  cors: {
    origin: {
      doc: 'CORS Origin Available URLs',
      format: Array,
      env: 'CORS_ORIGIN',
      default: '*'
    }
  }
});

config.loadFile([__dirname + '/configs/default.json', __dirname + '/configs/' + config.get('env') + '.json']);

export default config;
