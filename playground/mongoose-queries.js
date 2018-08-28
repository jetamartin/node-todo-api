const {ObjectID} = require('mongodb');

const {mongoose} = require ('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const todoId = '5b848b5ec88fadb8087a0097';
const userId = '5b81abb4db69958448181f6e';

if(!ObjectID.isValid(todoId)) {
  console.log('ID not valid');
}
// Todo.find({
//   _id: todoId
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: todoId
// }).then((todo) => {
//   console.log('Todo', todo);
// })
//
// Todo.findById(todoId).then((todo) =>{
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo', todo);
// }).catch((e) => console.log(e));

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('Unable to find user')
  }
  console.log('User', user)
}, (e) => {
  console.log(e);
})
