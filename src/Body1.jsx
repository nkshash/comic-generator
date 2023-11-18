import React from 'react';
import { Container, Button } from 'react-bootstrap';
import hero from './assets/back.jpg';

const Body1 = () => {
  return (
    <Container fluid style={{ position: "relative", width: '100%', height: '100vh', overflow: 'hidden', padding: "0px" }}>
      <img
        src={hero}
        alt="Comic Image"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{
        position: 'absolute',
        width: "100%",
        bottom: '0',
        left: '50%',
        right: '50%',
        overflow: "hidden",
        transform: 'translateX(-50%)',
        textAlign: 'left',
        color: '#fff',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '2px',
        borderRadius: '10px',
        marginRight: '10px',
      }}>
       
<div style={{ width: "100%", maxWidth: "400px", margin: "0 auto", marginBottom: '30px' }}>
  <h2 style={{ fontSize: '1.8em' }}>Comic Generation Steps</h2>
  <p style={{ fontSize: '1.2em', textAlign: 'left' }}>
    To generate your comic, follow these steps:
  </p>
  <ol style={{ fontSize: '1.2em', textAlign: 'left', paddingLeft: '20px' }}>
    <li>Fill all 10 panel boxes with your content.</li>
    <li>Ensure each panel tells a part of the story.</li>
    <li>Click the "Generate" button to create your comic.</li>
    <li>Download and share as you like.</li>
  </ol>
</div>

        
      </div>
    </Container>
  );
}

export default Body1;
