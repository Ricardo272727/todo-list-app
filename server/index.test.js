const { MongoClient } = require('mongodb');
const FactoryTaskModel = require('./models/task.js');

const config = require('./config.js');

const getNowDate = () => {
   let today = new Date();
   let strToday = String(today.getDate()).padStart(2,'0') + '/';
   strToday += String(today.getMonth()+1).padStart(2, '0') + '/';
   strToday += String(today.getFullYear());
   return strToday;
};

const mockTask = {
  assignedTo: "213u0dskdjsaklda",
  text: "Finish the new todo list app",
  date: getNowDate()
};

describe('CRUD operations - Task', () => {
  let db;
  let connection;
  let taskModel;
  beforeAll( async () => {
    connection = await MongoClient.connect(config.dbUrl, { 
      useNewUrlParsed: true, useUnifiedTopology: true
    });
    db = await connection.db(config.dbName);
    taskModel = FactoryTaskModel(db);
  });
  
  afterAll( async () => {
    await connection.close();
    await db.close();
    taskModel = null;
  });


  it('Should insert and delete a task', async () => {
    let taskInserted = await taskModel.insert( mockTask );
    expect(taskInserted._id).toBeTruthy();
    expect(taskInserted.assignedTo).toEqual(mockTask.assignedTo);
    expect(taskInserted.text).toEqual(mockTask.text);
    expect(taskInserted.date).toEqual(mockTask.date);
  
    let res = await taskModel.deleteById(taskInserted._id);
    expect(res).toEqual(true);
  });

  it('Should find all tasks', async () => {
    let tasks = await taskModel.getAll();
    expect(tasks).toBeTruthy();
    expect(tasks.length).toBeGreaterThan(-1);
    console.log(tasks);
  });

  it('Should create, update, find and delete a task', async () => {
    let newText = 'Finish the task app';
    let mockTask = {
      text: 'Test task', 
      date: getNowDate(), 
      assignedTo: 'sjakldjskl3432l'
    };
    let inserted = await taskModel.insert(mockTask);
    expect(inserted._id).toBeTruthy();
    let updatedTask = {...mockTask, text: newText };
    let resUpdate = await taskModel.updateById(inserted._id, updatedTask);
    expect(resUpdate).toEqual(true);
    
    let foundTask = await taskModel.findById(inserted._id);
    expect(foundTask.text).toEqual(newText);

    let deleted = await taskModel.deleteById(inserted._id);
    expect(deleted).toEqual(true);
   
  });
})
