// You can also use destructuring
const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // delete many
  // db.collection('ToDos').deleteMany({text: "Eat Lunch"}).then((result) => {
  //   console.log(result);
  // })


  // deleteOne
  // db.collection('ToDos').deleteOne({text: "Eat Lunch"}).then((result) => {
  //   console.log(result);
  // })


  // findOneAndDelete
  // db.collection('ToDos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // })

  // delete many
  // db.collection('Users').deleteMany({name: "Jet Martin"}).then((result) => {
  //   console.log(result);
  // })

  // findOneAndDelete
  db.collection('Users').findOneAndDelete({_id: new ObjectID("5b7f5c530ac2e80a6b1639d1")}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2);
  })


  // db.close();
});
