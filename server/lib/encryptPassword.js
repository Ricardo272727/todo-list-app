const md5 = require('md5');


const encryptPassword = (pass) => {
  let password = pass;
  for(let i = 0; i < 5; i += 1){
      password = md5(password);
  }
  return password;
};


module.exports = encryptPassword;
