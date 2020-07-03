
const FactoryUserModel = require('../models/user.js');
const config = require('../config.js');
const { checkRequiredFields } = require('../lib/validation.js');
const encryptPassword = require('../lib/encryptPassword.js');
const msg = require('../messages.js');

const FactoryUserController = (db) => {
    
  const userModel = FactoryUserModel(db);

  const login = (req, res) => {

    let missedFields = 
      checkRequiredFields(req, ['email', 'password']);
  
    if(missedFields){
      res.send({ errors: missedFields });
    } else {
      userModel.findByEmail(req.body.email)
      .then(user => {
         if(user.password === encryptPassword(req.body.password)){
            user = {...user, password: 'qti' };
            req.session.user = user;
            res.send({ user: user });
         } else {
            res.send({ errors: {
              password: msg.invalid.password
            }});
         }
      })
      .catch(err => {
        res.send({ errors: err });
      });
    }
  };

  const register = (req, res) => {
    let missedFields = 
      checkRequiredFields(req, ['name', 'email', 'password']);
    if(missedFields){
      res.send({ errors: missedFields });
    } else {
      userModel.findByEmail(req.body.email)
        .then(user => {
          if(!user){
            userModel.insert({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
            }, true)
              .then(userInserted => {
                req.session.user = { ...userInserted, password: 'qti'};
                res.send({ user: req.session.user });
              })
              .catch(err => {
                res.send({ errors: err });
              });
          } else {
            res.send( { errors: { email: 'This email has been registered'} } );
          }
        })
        .catch(err => {
          res.send({ errors: err });
        });
    }
  };


  const getAll = (req, res) => {
    userModel.getAll()
      .then(usrs => {
        let users = usrs.map(u => {
          return {...u, password: 'qti'}
        });
        res.send({ ok: true, users: users });
      })
      .catch(err => {
        res.status(500).send({ ok: false });
      });
  };

  const logout = (req, res) => {
    console.log("Logout");
    if(req.session && req.session.user) {
      req.session.user = null;
    }
    res.send({ ok: true });
  };

  const updateById = (req, res) => {
    if(!req.body._id)
      res.send({ errors: '_id is required'});
    if(!req.body.user)
      res.send({ errors: 'user is required'});
    
    userModel.updateById(
      req.body._id, req.body.user)
      .then(ok => {
        res.send({ ok: ok });
      })
      .catch(err => {
        res.send({ errors: err });
      });
  };

  return {
    login,
    register,
    logout,
    getAll,
    updateById
  }
};


module.exports = FactoryUserController;


