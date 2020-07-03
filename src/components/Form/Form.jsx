import React from 'react'; 
import "./Form.scss"; 

const Form = props => {
 return (
   <form
     onSubmit={props.onSubmit}
     className="form-cu"
   >
    {props.children}
  </form>
 );
} 

export default Form;
