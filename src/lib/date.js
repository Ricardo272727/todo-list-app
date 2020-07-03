export const getDateNow = () => {
  let now = new Date();
  return String(now.getDate()).padStart(2, '0') + '/' + String(now.getMonth() + 1).padStart(2, '0')
  + '/' + String(now.getFullYear());
};

console.log(getDateNow());


