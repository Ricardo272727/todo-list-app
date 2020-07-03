

const TokenFactory = (db) => {
   const collection = db.collection('tokens');

   const get = (name) => {
    return new Promise((resolve, reject) => {
      if(!name) reject('Missed param name');
      collection.findOne({ name: name })
        .then(token => {
          if(token && token.content)
            resolve(token.content);
          else
            reject(token);
        })
        .catch(err => {
          reject(err);
        });
    });
   };

  return { get };
};


module.exports = TokenFactory;

