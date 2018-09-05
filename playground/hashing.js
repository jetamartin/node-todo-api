const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  })
})

var hashedPassword ="$2a$10$9TUQCL8YVqzh4Iva6ZPZ/.0.3hBOyayeUzPlwV3UBVoZBMkMSnFsG";
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// var data = {
//   id: 10
// }
//
// // Takes the object (user id) and signs it (creats a hash and returns token value)
// var token = jwt.sign(data, '123abc');
//
//
// console.log(token)
// //
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);



// var message = "I am user number 3";
// var hash = SHA256(message).toString();
//
// console.log( `essage: ${message}`);
// console.log(`Hash: ${hash}`);
