var mongoose = require('mongoose');

// Must tell mongoose what Promise library to use
mongoose.Promise = global.Promise;

// Tell mongoose where to connect to MongoDb
// For Heroku we need to tell it where to connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
// ES5 syntax
// module.exports = {
//   mongoose: mongoose
// }

// ES6 syntax
module.exports = {mongoose};
