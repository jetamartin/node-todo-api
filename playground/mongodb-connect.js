// ES5 way of accessing MongoClient property of mongodb
// const MongoClient = require('mongodb').MongoClient;

// ES6 Destructuring technique -- same as above
// const {MongoClient} = require('mongodb');

// You can also use destructuring
const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('ToDos').insertOne({
  //   test: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  // Insert new doc into Users (name, age, location)
  db.collection('Users').insertOne({
    name: "Jet Martin",
    age: 45,
    location: 'San Diego, Ca'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  })

  db.close();
});
