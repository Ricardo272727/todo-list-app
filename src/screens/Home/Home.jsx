import React, { useEffect, useState } from 'react'; 
import "./Home.scss"; 
import Task from '../../components/Task/Task';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

const Home = props => {

 const allTasks = useSelector(state => state.tasks);
 const mainContent = useSelector(state => state.mainContent);
 const user = useSelector(state => state.user);
 const [tasks, setTasks] = useState([]); 

 useEffect(() => {
   if(mainContent === 'assignments'){
    setTasks(
      allTasks.filter(t => t.assignedTo === user._id)
    );
   } else {
     setTasks(allTasks);
   }
 },[mainContent, allTasks]);

 
 return (
  <Container fluid>
      <Row>
    {
    tasks.map(t => (
      <Col xs={6} md={3} key={t._id || t.id}>
        <Task task={t}/>
      </Col>
      ))
    }
      </Row>
   </Container>
  
 );
} 

export default Home;
