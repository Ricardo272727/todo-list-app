import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ACTIONS } from './actions.js';

const tasks = [
  { id: 0, assignedTo: 1, text: "Terminar to do list app", date: '12/12/2020' },
  { id: 1, assignedTo: 3, text: "Terminar video chat app", date: '12/12/2020' },
  { id: 2, assignedTo: 2, text: "Terminar landing page", date: '12/12/2020' },
  { id: 3, assignedTo: 0, text: "Terminar js navigator IDE", date: '12/12/2020' }
];

const user = {
  id: 0,
  name: "Ricardo Cuanalo",
  email: "cuanaloricardo@gmail.com",
  password: "this is my password",
  photo: "https://firebasestorage.googleapis.com/v0/b/ricardo272727-github-io.appspot.com/o/images%2Favatar.png?alt=media&token=a6d55898-f7ed-42d5-ae8f-5828dec464a0"
};

const users = [
  { id: 1, name: 'Britanny idelfonsa' },
  { id: 2, name: 'Atenea' },
  { id: 3, name: 'Puppy' },
  { id: 0, name: "Ricardo Cuanalo" }
];

const initialState = {
  appName: 'To do list app',
  tasks: [],
  user: null,
  users: users,
  asidePanel: null, // 'config' || 'profile'
  mainContent: 'all', // 'assignments',
  loginErrors: {},
  registerErrors: {},
  modifyUserErrors: {},
  globalError: null
};




const reducer = (state = initialState, action) => {
  switch(action.type){
    case ACTIONS.SET_TASKS:
      return {
        ...state,
        tasks: action.tasks
      }
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.user
      }
    case ACTIONS.SET_USERS:
      return {
        ...state,
        users: action.users
      }
    case ACTIONS.SET_ASIDE_PANEL:
      return {
        ...state,
        asidePanel: action.asidePanel
      }
    case ACTIONS.SET_MAIN_CONTENT:
      return {
        ...state,
        mainContent: action.mainContent
      }
    case ACTIONS.ASSIGN_TASK:
      return {
        ...state,
        tasks: state.tasks.map(t => {
          if(t._id === action.taskId)
            t.assignedTo = action.userId;
          return t;
        })
      }
    case ACTIONS.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(t => {
          if(t._id === action.taskId)
            t.text = action.text;
          return t;
        })
      }
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(t => t._id !== action.taskId) 
      }
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [action.task, ...state.tasks]
      }
    case ACTIONS.SET_LOGIN_ERRORS:
      return {
        ...state,
        loginErrors: action.errors
      }
    case ACTIONS.SET_REGISTER_ERRORS:
      return {
        ...state,
        registerErrors: action.errors
      }
    case ACTIONS.SET_GLOBAL_ERROR:
      return {
        ...state,
        globalError: action.error
      }
    default: 
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));


export default store;

