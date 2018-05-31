import React from 'react';
import {Navbar,Nav,NavItem,NavDropdown,MenuItem,Button} from "react-bootstrap";
import RootNode from "../RootNode/index";



const NavBar = ()=>(
<Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#brand">Root</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
     
      <NavItem>
        <RootNode/>
        </NavItem>
     
    </Nav>
   
  </Navbar.Collapse>
</Navbar>);

export default NavBar;