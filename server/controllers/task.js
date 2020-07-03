const FactoryTaskModel = require('../models/task.js');
const { checkRequiredFields } = require('../lib/validation.js');
const msg = require('../messages.js');

const FactoryTaskController = (db) => {

  const taskModel = FactoryTaskModel(db);

  const create = (req, res) => {
    let missedFields = 
      checkRequiredFields(req, ['assignedTo', 'text', 'date']);
    if(missedFields){
      console.log('missed fields create', missedFields);
      res.send({ errors: missedFields });
    } else {
      taskModel.insert({
        assignedTo: req.body.assignedTo,
        text: req.body.text,
        date: req.body.date
      }, true)
        .then(taskInserted => {
          res.send({ task: taskInserted });
        })
        .catch(err => {
          console.log('errors create', err);
          res.send({ errors: err });
        });
    }
  };

  const updateById = (req, res) => {
    let missedFields = 
      checkRequiredFields(req, ['_id', 'task']);
    if(missedFields){
      res.send({ errors: missedFields });
    } else {
      taskModel.updateById(req.body._id, req.body.task)
        .then(ok => {
          res.send({ ok: ok });
        })
        .catch(err => {
          res.send({ errors: err });
        });
    }
  };

  const getAll = (req, res) => {
    taskModel.getAll()
      .then(tasks => {
        res.send({ tasks: tasks });
      })
      .catch(err => {
        res.send({ errors: err });
      });
  };

  const deleteById = (req, res) => {
    let missedFields = 
      checkRequiredFields(req, ['_id']);
    if(missedFields){
      res.send({ errors: missedFields });
    } else {
      taskModel.deleteById(req.body._id)
        .then(ok => {
          res.send({ ok: ok });
        })
        .catch(err => {
          res.send({ errors: err });
        }) 
    }
  };

  return {
    create,
    updateById,
    getAll,
    deleteById
  }
};

module.exports = FactoryTaskController;
