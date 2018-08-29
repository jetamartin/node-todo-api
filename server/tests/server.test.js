const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},{
  _id: new ObjectID(),
  text: 'Second test todo'
}];

// Testing lifecyle method
beforeEach((done) => {
    Todo.remove({}).then( () => {
      return Todo.insertMany(todos);
    }).then(() => done());
});


describe('POST /todos', () => {
  // Asych test requires use of done to be passed in call back
  it('should create a new todo', (done) => {
    const text = 'Test todo text';
    // request() is a supertest method
    request(app)
    .post('/todos')
    .send({text}) // note supertest converts text object to JSON automatically
    .expect(200)
    // custom expect expression
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    // Check to see what got stored in MongoDB
    .end((err, res) => {
      // Callback allows us to handle errors that occured above e.g., status != 200
      if (err) {
        // returning done doesn't do anything special just stops program
        // execution given there was an error and prevents logic below from running
        return done(err);
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
        // Need to pass any error back to Mocha so it knows error occurred
        // otherwise it will be "swallowed" up by the promise unless we provide
        // a way to catch the error and propigate it back to Mocha
      }).catch((e) => done(e));
      // alt es5 syntax for above
      // .catch((e) => {
          // return e
    // });
    });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end( (err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2)
        done();
      }).catch((e) => done(e));
    });

  });


});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString() }`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done)
  });

  it('should return 404 if todo not found', (done) => {
    let _id = new ObjectID();
    request(app)
      .get(`/todos/${_id.toHexString()}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.todo).toNotExist();
      })
      .end(done)
  });
  it('should return 404 for non-object id', (done) => {
    // /todo/123
    request(app)
      .get('/todos/123')
      .expect(404)
    .end(done)
  })
});

describe('DELETE /todos/:id', () => {
  it('shoud remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // query datahbase using findById - toNotExist();
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      })
  });
  it('should return a 404 if todo not found', (done) => {
    var hexId = todos[1]._id.toHexString() + 1;
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done)

  });
  it('should return 404 if ObjectID is invalid', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done)
  });
})
