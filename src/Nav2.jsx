import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Logo from './assets/Logo.png';

const Nav2 = () => {
  const githubUrl = "https://github.com/nkshash/"; 

  const openGitHub = () => {
    window.open(githubUrl, "_blank");
  };

  return (
    <>
    <Navbar bg="dark" style={{paddingTop:"2px",paddingBottom:"2px"}}>
        <Container fluid >
        <Navbar.Brand href="#home">
            <img
              alt=""
              src={Logo}
              width="auto"
              height="50"
              className="d-inline-block align-top"
            />{' '}
           
          </Navbar.Brand>
          
          <Button variant="outline-light" style={{paddingLeft:"5px",paddingRight:"5px", }}><span style={{fontFamily:"sans-serif",fontSize:"15px"}} onClick={openGitHub}>My GitHub</span></Button>
        </Container>
      </Navbar>
</>
  );
}

export default Nav2;

