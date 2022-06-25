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
  }
});

config.loadFile([__dirname + '/configs/default.json', __dirname + '/configs/' + config.get('env') + '.json']);

export default config;
