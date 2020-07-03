
module.exports = function(req, res, next) {
    if(req.session && req.session.user){
      next();
    } else {
      res.send({ errors: 'You are not login'});
      res.end();
    }
}
