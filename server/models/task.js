
const ObjectID = require('mongodb').ObjectID;
const { isString, isDate } = require('../lib/validation.js');

const FactoryTaskModel = (db) => {

  const requiredInsertFields = ['assignedTo', 'text', 'date'];
  const collection = db.collection('tasks');

  const validateFieldTypes = (task) => {
    return (task.assignedTo ? isString(task.assignedTo) : true ) 
      && (task.text ? isString(task.text) : true );
  };

  const validateRequiredFields = (task) => {
    for(let i = 0; i < requiredInsertFields.length; i+=1){
      if(!task[requiredInsertFields[i]])
        return false;
    }
    return true;
  };

  const insert = (task) => {
    return new Promise((resolve, reject) => {
     if(!(validateRequiredFields(task) 
        && validateFieldTypes(task))){
        reject('Invalid fields');
     } else {
        collection.insertOne(task)
         .then(res => {
            resolve(res.ops[0]);
         })
         .catch(err => {
            reject(err);
         });
     }
    });
  };
 
  const updateById = (_id, task) => {
    return new Promise((resolve, reject) => {
      if(!_id) reject('Missed param: _id'); 
      if(!task)  reject('Missed param: _id');

      collection.updateOne({ _id: ObjectID(_id) }, 
        { $set: task })
        .then(res => {
          resolve(res.matchedCount === 1);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const deleteById = (_id) => {
    return new Promise((resolve, reject) => {
      if(!_id) reject('Missed param: _id');
      collection.deleteOne({ _id: ObjectID(_id) })
        .then(res => {
          resolve(res.deletedCount === 1);
        })
        .catch(err => {
          reject(err)
        });
    });
  };


  const getAll = () => {
    return new Promise((resolve, reject) => {
      collection.find().toArray()
        .then(tasks => {
          resolve(tasks);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const findById = (_id) => {
    return new Promise((resolve, reject) => {
      if(!_id) reject('Missed param _id');
      collection.findOne({ _id: ObjectID(_id) })
        .then(task => {
          resolve(task);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

    
  return {
    insert, 
    deleteById,
    updateById,
    getAll,
    findById
  };
};


module.exports = FactoryTaskModel;
