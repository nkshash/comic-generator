// Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  
  faYoutube,
  
  faInstagram,
  faLinkedinIn,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className=" text-center text-white" style={{background:"black"}}>
      <Container className="p-4 pb-0">
        {/* Section: Social media */}
        <section className="mb-4">
          

          {/* Twitter */}
          <a className="btn btn-outline-light btn-floating m-1" href="https://www.youtube.com/channel/UCy5WNp1tgEatEawv3owNGqQ/featured" role="button">
            <FontAwesomeIcon icon={faYoutube} />
          </a>

          

          {/* Instagram */}
          <a className="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/_____ishashank__/" role="button">
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          {/* LinkedIn */}
          <a className="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/shashank-mishra-546328205/" role="button">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>

          {/* GitHub */}
          <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/nkshash/nkshash" role="button">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </section>
        {/* Section: Social media */}
      </Container>

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Copyright:
        <a className="text-white" href="https://github.com/nkshash/nkshash">
          Shashank Mishra
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;

