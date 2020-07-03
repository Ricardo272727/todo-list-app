import React, { useEffect, useState } from 'react'; 
import "./Profile.scss"; 
import { Container, Row, Col, Input, Label, FormText, FormGroup } from 'reactstrap';
import Form from '../../components/Form/Form';
import { useSelector, useDispatch } from 'react-redux';
import useForm from '../../hooks/useForm.js';
import { updateUser } from '../../store/actions/user.js';
import { useToasts } from 'react-toast-notifications';


const Profile = props => {
 
 const user = useSelector(state => state.user);
 const modifyUserErrors = useSelector(state => state.modifyUserErrors);
 const [disabled, setDisabled] = useState(true);
 const dispatch = useDispatch();
 const { addToast } = useToasts();

 const form = useForm({
    name: user.name, 
    password: ''
 });

 const modifyUser = (e) => {
   e.preventDefault();
   dispatch(updateUser({
     _id: user._id,
     name: form.fields.name,
     password: form.fields.password,
     success:  () => addToast('User updated correctly', {
       appearance: 'success',
       autoDismiss: true
     }),
     failed: () => addToast('Network error please verify your connection', 
       { appearance: 'error' })
   }));
 };

 useEffect(() => {
  if(form.fields.name !== user.name || 
    form.fields.password.length > 0) {
    setDisabled(false);
  } else {
    setDisabled(true);
  }
 }, [form.fields.name, form.fields.password]);

 return (
  <Container className="pt-5 profile">
    <Row className="px-3 mb-5">
      <Col xs={4} md={{size: 1, offset: 4}} className="user-photo">
        <img src={user.photo || "/user.png"} alt="Profile" className="img-fluid" />
      </Col>
      <Col xs={8} md={{size: 3}} className="d-flex align-items-center username">
        <b className="m-0 p-0">{user.email}</b>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={{size: 4, offset: 4}}>
        <Form onSubmit={modifyUser}>
          <FormGroup>
            <Label htmlFor="name">Username</Label>
            <Input
              type="text"
              {...form.getInput('name')}/>
              {
              ( form.errors.name || modifyUserErrors.name ) &&
              <FormText>
                {form.errors.name || modifyUserErrors.name}
              </FormText>
              }
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              {...form.getInput('password')}/>
              {
              ( form.errors.password || modifyUserErrors.password ) &&
              <FormText>
                {form.errors.password || modifyUserErrors.password}
              </FormText>
              }
          </FormGroup>
          <FormGroup className="mt-5">
            <button type="submit" disabled={disabled}>Save</button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
   </Container>  
 );
} 

export default Profile;
