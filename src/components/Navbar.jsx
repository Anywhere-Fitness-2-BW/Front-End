import React from "react";
import {Nav, NavItem, NavLink} from 'reactstrap';

export default function NavBar(){

return(
    <div>
        <Nav>
          <NavItem className='register'>
              <NavLink href='/'>Sign Up</NavLink>
          </NavItem>
          <NavItem>
              <NavLink href='/login'>Login</NavLink>
          </NavItem>
        </Nav>
    </div>
)
}