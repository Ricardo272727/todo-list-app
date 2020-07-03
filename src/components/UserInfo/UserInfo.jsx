import React, { useState } from 'react'; 
import "./UserInfo.scss"; 
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/actions/user.js';

const UserInfo = props => {
  const user = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const dispatch = useDispatch();

 return (
  <div className="user-info">
    <button onClick={toggle}>
       <img className="img-fluid" src={user.photo || "/user.png"} alt={user.name} />
    </button>
    <div className={"menu" + (open ? ' d-block' : ' d-none')}>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button onClick={ () => dispatch(logout())}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
 );
} 

export default UserInfo;
