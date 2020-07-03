import { endpoints } from '../../config/endpoints.js';
import { ACTIONS } from '../actions.js';
import { getTasks } from './task.js';

export const setUser = (user) => {
  return {
    type: ACTIONS.SET_USER,
    user
  }
};

export const setUsers = (users) => {
  return {
    type: ACTIONS.SET_USERS,
    users
  }
};

export const setLoginErrors = (errors) => {
  return {
    type: ACTIONS.SET_LOGIN_ERRORS,
    errors
  }
};

export const setRegisterErrors = (errors) => {
  return {
    type: ACTIONS.SET_REGISTER_ERRORS,
    errors
  }
};

export const login = ({email, password}) => {
  console.log('Login with:' , email, password);
  return function(dispatch) {
    return fetch(endpoints.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      }),
      credentials: 'include'
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        if(!data.errors){
          dispatch(setUser(data.user));
          dispatch(getUsers());
          dispatch(getTasks());
        } else {
          dispatch(setLoginErrors(data.errors));
        }
      })
      .catch(err => {
        dispatch(setLoginErrors(err));
      });
  }  
};

export const logout = () => {
  return (dispatch) => {
    return fetch(endpoints.logout, {
      method: 'POST'
    })
      .then(res => {
        dispatch(setUser(null));
      })
  }
};

export const register = ({name, email, password}) => {
  return (dispatch) => {
    fetch(endpoints.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, email, password
      })
    })
      .then(res => res.json())
      .then(data => {
        if(!data.errors){
          dispatch(setUser(data.user));
          dispatch(getUsers());
          dispatch(getTasks());
        } else {
          dispatch(setRegisterErrors(data.errors));
        }
      })
      .catch(err => {
        dispatch(setRegisterErrors(err));
      });
  }
};

export const updateUser = ({ _id, name, password, success, failed }) => {
  return (dispatch, getState) => {
    if(!_id || (!name && !password)) return Promise.resolve();
    let user = {};
    if(name && getState().user.name !== name){
      user.name = name;
    }
    if(password && getState().user.password !== password){
      user.password = password;
    }
    fetch(endpoints.updateUser, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: _id,
        user: user
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
          dispatch(setUser({...getState().user, ...user }));
          if(success) success();
      })
      .catch(err => {
        if(failed) failed();
      });
  };
};

export const getUsers = () => {
  console.log("getting users", endpoints.users);
  return (dispatch) => {
    fetch(endpoints.users, { 
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        console.log('response getting users', res);
        if(res.errors) {
        } else {
          dispatch(setUsers(res.users));
        }
      })
      .catch(err => {
      })
  };
};


