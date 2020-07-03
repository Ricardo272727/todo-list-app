const isString = (str) => typeof str === 'string';
const isEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
const isDate = (date) => /\d{2}\/\d{2}\/\d{4}/.test(date);


const checkRequiredFields = (req, fields) => {
  let missedFields = [];
  for(let i = 0; i < fields.length; i +=1 ){
    if(!req.body[fields[i]]){
      missedFields.push( fields[i] + ' is required' );
    }
  }
  if(missedFields.length > 0)
    return missedFields;
  return null;
};


module.exports = { isString, isEmail, isDate, checkRequiredFields };
