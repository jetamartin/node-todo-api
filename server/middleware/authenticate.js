
var {User} = require('./../models/user');
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      // User couldn't be found
      res.status(401).send();
      // Alternative logic would be to reject promise right there
      // and this would cause it to go directly catch block below
      // return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch ((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
