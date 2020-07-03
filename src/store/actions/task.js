import { endpoints } from '../../config/endpoints.js';
import { getDateNow } from '../../lib/date.js';
import { ACTIONS } from '../actions.js';

export const setTasks = (tasks) => {
  return {
    type: ACTIONS.SET_TASKS,
    tasks
  }
};

export const getTasks = () => {
  return (dispatch) => {
    fetch(endpoints.task, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if(data.tasks){
          dispatch(setTasks(data.tasks));
        } else {          
        }
      }) 
      .catch(err => {        
      })
  };
};

export const createTask = ({ userId, success, failed }) => {
  return (dispatch) => {
    fetch(endpoints.task, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        assignedTo: userId,
        text: 'Write some here',
        date: getDateNow()
      })
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        dispatch(addTask(json.task));
        if(success) success();
      })
      .catch(err => {
        if(failed) failed();
      });
  };
};

export const modifyTask = (
  { taskId, text, assignedTo, success, failed }) => {

  console.log('modifiing task');
  return (dispatch) => {
    if( !taskId || (!text && !assignedTo) ) return;
    let body = {
      _id: taskId,
      task: {}
    };
    if(assignedTo)
      body.task.assignedTo = assignedTo;
    if(text)
      body.task.text = text;

    fetch(endpoints.task, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        if(res.ok){
          if( text )
            dispatch(editTask(taskId, text));
          if( assignedTo )
            dispatch(assignTask( assignedTo, taskId ));
          if(success) success();
        } else {
          if(failed) failed();
        }
      })
      .catch(err => {
        if(failed) failed();
      });

  };
};

export const removeTask = ({ _id, success, failed }) => {
  return (dispatch) => {
    fetch(endpoints.task, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: _id
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if(data.ok){
          dispatch(deleteTask(_id));
          if(success) success();
        } else if(data.errors) {
          if(failed) failed();
        }
      })
      .catch(err => {
        if(failed) failed();
      })
  };
};

export const addTask = (task) => {
  return {
    type: ACTIONS.ADD_TASK,
    task
  }
};

export const assignTask = (userId, taskId) => {
  return {
    type: ACTIONS.ASSIGN_TASK,
    userId,
    taskId
  } 
};

export const editTask = (taskId, text) => {
  return {
    type: ACTIONS.EDIT_TASK,
    taskId,
    text
  }
};

export const deleteTask = (taskId) => {
  return {
    type: ACTIONS.DELETE_TASK,
    taskId
  }
};





