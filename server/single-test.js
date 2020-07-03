

const isDate = (date) => /\d{2}\/\d{2}\/\d{4}/.test(date);
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

console.log(dd,mm,yyyy);


