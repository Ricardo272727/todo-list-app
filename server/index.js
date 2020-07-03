const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');  
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
const config = require('./config.js');
const FactoryUserController = require('./controllers/user.js');
const FactoryTaskController = require('./controllers/task.js');
const sessionMiddleware = require('./middlewares/session.js');
const cors = require('cors');

MongoClient.connect(config.dbUrl, { useUnifiedTopology: true }, async function(err, client) {
  
  assert.equal(null, err);

  console.log("Connected correctly to database");
  
  const db = client.db(config.dbName);
  const UserController = FactoryUserController(db);
  const TaskController = FactoryTaskController(db);

  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use(bodyParser.json());

  app.use(session({
    secret: 'atenea is a cat',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new MongoStore({
      client: client,
      dbName: config.dbName,
      ttl: 60 * 60 
    })
  }));
  
  let corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  };
  app.use(cors(corsOptions));

  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app.post('/login', UserController.login );

  app.post('/logout', UserController.logout );

  app.post('/register', UserController.register );

  app.put('/user', UserController.updateById );

  app.get('/users', sessionMiddleware, UserController.getAll );

  app.post('/task', sessionMiddleware, TaskController.create );

  app.put('/task', sessionMiddleware, TaskController.updateById);

  app.get('/task', sessionMiddleware, TaskController.getAll);

  app.delete('/task', sessionMiddleware, TaskController.deleteById );

  app.listen(5000, () => {
     console.log("Server listen on port: 5000");
     console.log("Go to localhost:5000");
  })
})



