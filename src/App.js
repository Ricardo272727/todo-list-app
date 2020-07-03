import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import Login from './screens/Login/Login';
import Home from './screens/Home/Home';
import Register from './screens/Register/Register';
import Profile from './screens/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';




function App() {
  
  return (
    <Router className="App">
      <ToastProvider>
       <Navbar />
        <Switch>
          <PublicRoute exact path="/">
            <Login />
          </PublicRoute>
          <PublicRoute path="/register">
            <Register />
          </PublicRoute>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
        </Switch>
      </ToastProvider>
    </Router>
  );
}

export default App;
