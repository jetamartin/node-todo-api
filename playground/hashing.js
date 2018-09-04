const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
}

// Takes the object (user id) and signs it (creats a hash and returns token value)
var token = jwt.sign(data, '123abc');


console.log(token)
//
var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);



// var message = "I am user number 3";
// var hash = SHA256(message).toString();
//
// console.log( `essage: ${message}`);
// console.log(`Hash: ${hash}`);
