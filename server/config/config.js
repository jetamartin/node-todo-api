const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test' ) {
  var config = require("./config.json");
  var envConfig = config[env];
  // Gets all keys for and object and returns them in an array
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
