const encryptPassword = require('../lib/encryptPassword.js');
const { isString, isEmail } = require('../lib/validation.js');
const { ObjectID } = require('mongodb');

const FactoryUserModel = (db) => {
  
  const collection = db.collection('users');
  const requiredInsertFields = ['name', 'email', 'password'];

  const validateInsert = (user) => {
    if(user['_id']) return false;
    for(let i = 0; i < requiredInsertFields.length; i += 1){
      if(!user[requiredInsertFields[i]])
        return false;
    }
    return isString(user['name']) && isEmail(user['email']);
  };

  const insert = (user, validation) => {
    return new Promise((resolve, reject) => {
      if(validation && !validateInsert(user)){
        reject('Invalid data on insert');
      } else {
        let userInsert = {
          ...user,
          password: encryptPassword(user.password)
        };
        collection.insertOne(userInsert)
          .then(res => {
            resolve(res.ops[0]);
          })
          .catch(err => {
            reject(err);
          });
      }
    })
  };

  const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
      if(!email) reject('Missed param email');
      else {
        collection.findOne({ email: email })
          .then(user => {
            resolve(user);
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  };

  const getAll = () => {
    return new Promise((resolve, reject) => {
      collection.find().toArray()
        .then(users => {
          resolve(users);
        })
        .catch(err => {
          reject(err);
        });
    });  
  };

  const updateById = (_id, user) => {
    return new Promise((resolve, reject) => {
      let updatedUser = {};
      if(user.name) {
        updatedUser.name = user.name;
      }
      if(user.password) {
        updatedUser.password = encryptPassword(user.password);
      }
      collection.updateOne(
        { _id: ObjectID(_id)},
        { $set: updatedUser })
        .then(res => {
          resolve(res.modifiedCount === 1);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return {
    findByEmail,
    insert,
    getAll,
    updateById
  }
};


module.exports = FactoryUserModel;

