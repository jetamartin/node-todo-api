const _ = require('lodash');
const {ObjectID} = require('mongodb');

const express = require('express');
const bodyParser = require('body-parser')


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

// Setup for Heroku -- if env variable present use it otherwise use 3000
const port = process.env.PORT || 3000;

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

app.get('/todos/:id', (req, res) => {
  // See what params are send in request
  // res.send(req.params);

  const id = req.params.id;
  // Check to make sure id params is valid
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // Id valid - query DB for document
  Todo.findById(id).then( (todo) => {
    // No matching document found return 404
    if (!todo) {
      return res.status(404).send()
    }
    // Document found - return todo as object with todo as attribute
    res.send({todo});

  // Otherwise if there were any other errors send 400
}).catch((e) => {
    res.status(400).send();
  })
})

app.delete('/todos/:id', (req, res) => {
  // get the id
  const id = req.params.id
  // validate the id (not valid? return 404)
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    // if no matching todo found it returns null so we need to handle that
    if (!todo) {
      return res.status(404).send()
    }
    // Document found - return todo as object with todo as attribute
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // Create object containing only things we allow user to update...
  // so if the user sends us additonal properties (e.g., completedAt) we won't update them)
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // Update completed parameter
  // if user marked as commpleted we nee to set completedAt

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  // If user marked as no complete we need to clear completedAt property
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  // Set values we picked in body above, return updated record via 'new: true'
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})


app.listen(port, () => {
  console.log(`Started on port ${port}`);
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
