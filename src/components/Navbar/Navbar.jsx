import React from 'react';
import { FaTasks } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from '../UserInfo/UserInfo';
import { GrAdd } from 'react-icons/gr';
import "./Navbar.scss";
import { setMainContent } from '../../store/actions.js';
import { createTask } from '../../store/actions/task.js';
import { useLocation, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const Navbar = props => {
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const location = useLocation();
  const history = useHistory();
  const { addToast } = useToasts();

  const showAll = () => dispatch( setMainContent( 'all' ) );
  const showAssignments = () => dispatch( setMainContent( 'assignments' ) );
  const newTask = () => dispatch( createTask({
    userId: user._id || user.id,
    success: () => addToast('Task created', { 
      appearance: 'success', autoDismiss: true
    }),
    failed: () => addToast('Network error, please verify your connection', {
      appearance: 'error'
    })
  }));

  const verifyLocation = (path, callback) => {
    if(location.pathname !== path){
      history.push(path);
    } 
    callback();
  };

 if(!user) return null;
 return (
  <nav className="navbar">
    <ul>
      <li>
        <button onClick={() => verifyLocation('/home', showAll)}>
          <span>All</span>
        </button>
      </li>
      <li>
        <button onClick={() => verifyLocation('/home', showAssignments)}>
          <span>
            Assignments
          </span>
          <FaTasks/>
        </button>
      </li>
      <li>
        <button onClick={() => verifyLocation('/home', newTask)}>
          <span>
            New
          </span>
          <GrAdd/>
        </button>
      </li>
    </ul>
    <UserInfo/>
  </nav>
 );
} 

export default Navbar;
