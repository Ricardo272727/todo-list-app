import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


function PublicRoute({ children , ...rest}) {

  const user = useSelector(state => state.user);
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          <Redirect 
            to="/home"
          />
        )  : (
          children                      
        )
      }
    />
  );
}


export default PublicRoute;
