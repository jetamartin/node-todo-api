// You can also use destructuring
const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('ToDos').findOneAndUpdate({
  //   _id: new ObjectID('5b7f7d950ac2e80a6b16404f')
  // },{
  //   $set: { completed: true }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b7f931b0ac2e80a6b164908')
  },{
    $set: { name: 'Jet Martin' },
    $inc: { age:  1 }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })
  // db.close();
});
