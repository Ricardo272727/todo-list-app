
export const ACTIONS = {
  SET_TASKS: 'SET_TASKS',
  SET_USER: 'SET_USER',
  SET_USERS: 'SET_USERS',
  SET_ASIDE_PANEL: 'SET_ASIDE_PANEL',
  SET_MAIN_CONTENT: 'SET_MAIN_CONTENT',
  ADD_TASK: 'ADD_TASK',
  ASSIGN_TASK: 'ASSIGN TASK',
  EDIT_TASK: 'EDIT_TASK',
  DELETE_TASK: 'DELETE_TASK',
  SET_LOGIN_ERRORS: 'SET_LOGIN_ERRORS',
  SET_REGISTER_ERRORS: 'SET_REGISTER_ERRORS',
  SET_GLOBAL_ERROR: 'SET_GLOBAL_ERROR'
};

export const setAsidePanel = (asidePanel) => {
  return {
    type: ACTIONS.SET_ASIDE_PANEL,
    asidePanel
  }
};

export const setMainContent = (mainContent) => {
  return {
    type: ACTIONS.SET_MAIN_CONTENT,
    mainContent
  }
};

export const setGlobalError = (error) => {
  return {
    type: ACTIONS.SET_GLOBAL_ERROR,
    error
  };
};


