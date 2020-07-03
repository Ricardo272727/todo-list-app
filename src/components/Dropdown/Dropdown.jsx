import React, { useState } from 'react'; 
import "./Dropdown.scss"; 
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Dropdown = props => {

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = setOpen(!dropdownOpen);

 return (
   <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
     <DropdownToggle caret>
      {props.children}
     </DropdownToggle>
     <DropdownMenu>
       {
        props.items.map(item => (
          <DropdownItem key={item.id}>{item.name}</DropdownItem>
        ))
       }
     </DropdownMenu>
    </ButtonDropdown>
 );
} 

export default Dropdown;
