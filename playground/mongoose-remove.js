const {ObjectID} = require('mongodb');

const {mongoose} = require ('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Remove multiple documents if {} object it will delete all Todos
// Note: doesn't return removed documents...just number removed
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Find first matching doc and remove it...Resturns deleted item
Todo.findOneAndRemove({_id: '5b86e51c80d517edd248a16b'}).then((todo) => {
 console.log(todo);
});

Todo.findByIdAndRemove('5b86e3fb80d517edd248a0fe').then((todo) => {
  console.log(todo)
})
