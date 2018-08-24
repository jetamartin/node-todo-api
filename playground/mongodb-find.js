// You can also use destructuring
const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('ToDos').find(
  //   {_id: new ObjectID("5b7f4cd80ac2e80a6b163522")}).toArray().then((docs) => {
  //   console.log('ToDos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // })
  // db.collection('ToDos').find().count().then((count) => {
  //   console.log(`ToDos count ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // })

  db.collection('Users').find({name: "Jet Martin"}).toArray().then((docs) => {
    console.log('Users name: Jet Martin');
    console.log(docs);
  }, (err) => {
    if (err) {
      console.log('Unable to fetch users', err);
    }
  })
  // db.close();
});
