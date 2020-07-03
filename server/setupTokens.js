const md5 = require('md5');
const taskToken = md5('this is a secret token');


module.exports = (db) => {
  let tokens = db.collection('tokens');

  return new Promise((resolve, reject) => {
    tokens.findOneAndUpdate({ name: 'task'} , 
      { $set: { name: 'task', content: taskToken } },
      { upsert: true, projection: { content: 1 } })
      .then((res) => {
        resolve(res.value.content);
      })
      .catch((err) => {
        reject({ err: 'Error inserting task token'});
      });
  });
};


