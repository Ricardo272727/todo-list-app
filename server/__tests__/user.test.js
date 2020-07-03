const FactoryUserModel = require('../models/user.js');
const { MongoClient } = require('mongodb');
const config = require('../config.js');
const encryptPassword = require('../lib/encryptPassword.js');

let user = {
  name: 'Ricardo Cuanalo',
  email: 'cuanaloricardo@gmail.com',
  password: 'this is my password'
};

describe('User model', () => {

  let db, connection, userModel;

  beforeAll(async () => {
    connection = await MongoClient.connect(config.dbUrl, {
      useNewUrlParsed: true, useUnifiedTopology: true 
    });
    db = await connection.db(config.dbName);
    userModel = FactoryUserModel(db);
  });

  afterAll( async () => {
    await connection.close();
    await db.close();
    connection = null;
    userModel = null;
    db = null;
  });

  it('Should insert a user', async () => {
    
    let inserted = await userModel.insert(user);
    expect(inserted._id).toBeTruthy();
    expect(inserted.password).toEqual(encryptPassword(user.password));
    expect(inserted.email).toEqual(user.email);
  });
  
  it('Should find a user by email', async () => {
    let userFound = await userModel.findByEmail(user.email);
    expect(userFound.email).toEqual(user.email);
    expect(userFound._id).toBeTruthy();
    expect(userFound.name).toEqual(user.name);
  });
  
});

