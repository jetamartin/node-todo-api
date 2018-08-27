var express = require('express');
var bodyParser = require('body-parser')


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());


app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
})


app.listen(3000, () => {
  console.log('Started on port 3000');
})

module.exports = {app};

// Create a new Todo
// var newTodo = new Todo({
//   text: 'Cook dinner'
// });

// Save Todo to Database
// newTodo.save().then((doc) => {
//   console.log('Saved Todo', doc);
// }, (e) => {
//   console.log('Unable to save Todo');
// })

// var date = new Date();
// var completeDate = date.parse
// console.log(completeDate);

// var newTodo = new Todo({
//   text: 'Go to gym',
//   completed: true,
//   // completedAt: Number(new Date())
//   completedAt: new Date().getTime()
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved Todo', doc);
// }, (e) => {
//   console.log('Unable to save Todo item',e);
// });

// Create New user model
// email property, required, trimmed, set type, min length 1



// var newUser = new User({
//   // email: '  jet@example.com'
// });
//
// newUser.save().then((doc) =>{
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log("Unable to save user", e);
// });
