const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      // message: '{VALUE} is not a valid email'
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  // Should have been able to just push new value to array but there were some
  // consistency issues between different versions of Mongo so we switched to concat method
  // user.tokens.push({access, token})
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(()=> {
    return token;
  });
}
// Note: use of statics rather than method make this function a Model method
UserSchema.statics.findByToken = function (token) {
  var User = this; // Model is the this binding
  var decoded;
  try {
    decoded = jwt.verify(token, 'abc123');

  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({  // return it so we can continue chaining in server.js
    '_id': decoded._id,  // which id is this????
    'tokens.token': token, // Query nested document's tokens array to search for matching token
    'tokens.access': 'auth'
  });
};

UserSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    })
  } else {
    next();
  }
})

var User = mongoose.model('User', UserSchema);


module.exports = {User};
