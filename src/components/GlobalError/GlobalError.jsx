import React from 'react'; 
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import "./GlobalError.scss"; 

const GlobalError = props => {
 const globalError = useSelector(state => state.globalError);

 return (
  globalError ?
   <Container className="global-error pt-5 mt-3">
     <center>
      <h3>{globalError}</h3>
     </center>
   </Container>
   :
   props.children
 );
} 

export default GlobalError;
