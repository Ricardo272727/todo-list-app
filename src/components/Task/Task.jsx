import React, { useEffect } from 'react'; 
import { Container, Row, Col } from 'reactstrap';
import PropTypes  from 'prop-types';
import "./Task.scss"; 
import { FiEdit } from 'react-icons/fi';
import { MdDelete, MdAssignmentInd, MdSave } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import useTask from '../../hooks/useTask.js';
import Alert from '../../components/Alert/Alert';

const Task = props => {
 const users = useSelector(state => state.users);
 const task = useTask(props.task);
 
 useEffect(() => {
  task.setText(props.task.text);
 }, [props.task.text, task.setText]);

 return (
  <Container className="task">
    <Row>
      <Col xs={4} className="option assign">
        <ButtonDropdown isOpen={task.dropdownOpen} toggle={task.toggleDropdown}>
          <DropdownToggle caret>
            <MdAssignmentInd/>
          </DropdownToggle>
          <DropdownMenu>
            { users.map(u => (
              <div key={u._id || u.id}>
                <DropdownItem 
                  className={u._id === props.task.assignedTo ? 'selected' : ''}
                  onClick={() => task.assignTo(u._id)}>{u.name}</DropdownItem>
                <DropdownItem divider />
              </div>
            ))}
          </DropdownMenu>
         </ButtonDropdown>
      </Col>
      <Col xs={4} className="option edit">
        { task.editable &&
        <button onClick={task.save}>
          <MdSave/>
        </button>
        }
        {
          !task.editable &&
           <button onClick={task.edit}>
              <FiEdit/>
            </button>
        }
      </Col>
      <Col xs={4} className="option delete">
        <button onClick={task.toggleDeleting}>
          <MdDelete/>
        </button>        
      </Col>
    </Row>
    <Row>
      <Col 
        xs={12} 
        className="content" 
        onClick={() => task.edit()}
        onBlur={() => task.save()}>
        { !task.editable &&
        <p>
          {props.task.text}
        </p>
        }
        {
          task.editable &&
            <textarea
              ref={task.textareaRef}
              name="task"
              value={task.text}
              onChange={(e) => task.setText(e.target.value)}
          />}
      </Col>
    </Row>
    <Alert 
      show={task.deleting} 
      onCancel={task.toggleDeleting}
      onAccept={task.deleteFunc}
      message="Are you sure want delete this task?"/>
   </Container>
 );
} 

Task.propTypes = {
  task: PropTypes.object.isRequired,
}

export default Task;
