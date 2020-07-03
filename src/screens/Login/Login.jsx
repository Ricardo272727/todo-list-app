import React, { useState } from 'react'; 
import { Container, Row, Col, Input, Label, FormGroup, FormText } from 'reactstrap';
import { BsListCheck } from 'react-icons/bs';
import Form from '../../components/Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/user.js';
import { isEmail, isEmpty } from '../../lib/validate.js';
import useForm from '../../hooks/useForm';
import "./Login.scss"; 
import { Link } from 'react-router-dom';


const itemEmail = 'todolistapp-email';
const itemRememberMe = 'todolistapp-rememberme';
const initialValues = {
   email: localStorage.getItem(itemEmail) ? 
    localStorage.getItem(itemEmail) : '',
   password: '' 
};

const validatePassword = (pass) => {
  if(isEmpty(pass))
    return { error: "Password is required" };
  return true;
}

const validateEmail = (email) => {
    if(isEmpty(email)) 
        return { error: "This field is required" };
    else if(!isEmail(email))
        return { error: "Invalid email address" };
    return true;
}

const validate = (name, value) => {
    switch(name){
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      default:
        return true;
    }
}


const Login = props => {
    
  const dispatch = useDispatch();
  const appName = useSelector(state => state.appName);
  const loginErrors = useSelector(state => state.loginErrors);
  const form = useForm(initialValues, validate);
  const [remember, setRemember] = useState(
    localStorage.getItem(itemRememberMe) === 'true' ? true : false);

  const toggleRemember = (e) => {
    let { checked } = e.target;
    if(checked){
      setRemember(true);
      localStorage.setItem(itemRememberMe, true);
      localStorage.setItem(itemEmail, form.fields.email);
    } else {
      setRemember(false);
      localStorage.setItem(itemRememberMe, false);
      localStorage.removeItem(itemEmail);
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if(form.validate()){
        console.log(form.fields);
        dispatch(login({
          email: form.fields.email,
          password: form.fields.password
        }));
      }
  };

 return (
   <Container className="login-screen">
    <Row>
      <Col xs={12} md={{size: 4, offset: 4}}>
        <Form onSubmit={handleSubmit}>
          <header>
            <BsListCheck/>
            <h2>{appName}</h2>
          </header>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email"
              {...form.getInput('email')}/>
              {
                (form.errors.email || loginErrors.email) &&
                <FormText>{form.errors.email || loginErrors.email}</FormText>
              }
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input 
              type="password"
              {...form.getInput('password')}
            />
              {
                (form.errors.password || loginErrors.password) &&
                <FormText>{form.errors.password || loginErrors.password}</FormText>
              }
          </FormGroup>
          <FormGroup>
            <Input 
              type="checkbox"
              onChange={toggleRemember}
              checked={remember}
            />
            <Label htmlFor="rememberMe">Remember me</Label>
          </FormGroup>
          <FormGroup>
            <button type="submit">Login</button>
          </FormGroup>
          <FormGroup>
            <Link to="/register">Or sign in here</Link>
          </FormGroup>
        </Form>
      </Col>
    </Row>
   </Container>
 );
} 

export default Login;
