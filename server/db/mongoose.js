var mongoose = require('mongoose');

// Must tell mongoose what Promise library to use
mongoose.Promise = global.Promise;

// Tell mongoose where to connect to MongoDb
mongoose.connect('mongodb://localhost:27017/TodoApp');
// ES5 syntax
// module.exports = {
//   mongoose: mongoose
// }

// ES6 syntax
module.exports = {mongoose};
