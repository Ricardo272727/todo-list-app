import React from 'react'; 
import "./Register.scss"; 
import { Container, Row, Col, Input, Label, FormText, FormGroup } from 'reactstrap';
import Form from '../../components/Form/Form';
import { isEmail, isEmpty } from '../../lib/validate.js';
import useForm from '../../hooks/useForm.js';
import { BsListCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/actions/user.js';

const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '' 
};

const validate = (name, value) => {
    switch(name){
        case 'name':
            if(isEmpty(value))
                return { error: 'Name is required' };
            break;
        case 'email':
            if(isEmpty(value))
                return { error: 'Email is required' };
            else if(!isEmail(value))
                return { error: 'Invalid email address' };
            break;
        case 'password':
            if(isEmpty(value))
                return { error: 'Password is required' };

            break;
        case 'passwordConfirm':
            if(isEmpty(value))
              return { error: 'This field is required' }
            else 
              return {
                validator: (fields) => value === fields['password'],
                message: 'Password must match' 
              }
        default:
    }
    return true;
}

const Register = props => {

 const form = useForm(initialValues, validate);
 const registerErrors = useSelector(state => state.registerErrors);
 const dispatch = useDispatch();

 const handleSubmit = (e) => {
   e.preventDefault();
   if(form.validate()){
      console.log("Submit register data", form.fields);
      dispatch(register({ 
        name: form.fields.name,
        email: form.fields.email,
        password: form.fields.password
      }));
   }
 };

 return (
  <Container className="register-screen">
    <Row>
      <Col xs={12} md={{size: 4, offset: 4}}>
        <Form onSubmit={handleSubmit}>
          <header>
            <BsListCheck/>
            <h3>Sign in</h3>
          </header>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input type="text" {...form.getInput('name')}/>
            { 
              ( form.errors.name || registerErrors.name ) &&
              <FormText>{form.errors.name || registerErrors.name}</FormText>
            }
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email" {...form.getInput('email')}/>
            { 
              ( form.errors.email || registerErrors.email ) &&
              <FormText>{form.errors.email || registerErrors.email}</FormText>
            }
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input type="password" {...form.getInput('password')}/>
            { 
              ( form.errors.password || registerErrors.password ) &&
              <FormText>{form.errors.password}</FormText>
            }
          </FormGroup>
          <FormGroup>
            <Label htmlFor="passwordConfirm">Password confirm</Label>
            <Input type="password" {...form.getInput('passwordConfirm')}/>
            {
              form.errors.passwordConfirm &&
                <FormText>{form.errors.passwordConfirm}</FormText>
            }
          </FormGroup>
          <FormGroup>
            <button type="submit">Sign in</button>
          </FormGroup>
          <FormGroup>
            <Link to="/" >Or login here</Link>
          </FormGroup>
        </Form>        
      </Col>
    </Row>
   </Container>  
 );
} 

export default Register;
