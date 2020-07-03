import React from 'react'; 
import "./Alert.scss"; 
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

const Alert = props => {
 if(!props.show) return null;
 return (
  <main className="alert-cu">
    <div className="body">
      <div className="close">
        <button onClick={props.onCancel}>
          <MdClose/>
        </button>
      </div>
      <div className="message">
        <p>{props.message}</p>
      </div>
      <div className="controls">
        <button className="onCancel" onClick={props.onCancel}>Cancel</button>
        <button className="onAccept" onClick={props.onAccept}>Yes</button>
      </div>
    </div>
  </main>
 );
} 

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default Alert;
