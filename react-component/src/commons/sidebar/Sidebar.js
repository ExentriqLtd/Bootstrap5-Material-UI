import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Aggiungi un file CSS per eventuali stili personalizzati

function Sidebar() {
  return (
    <div className="sidebar">
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        {/* <Nav.Link as={Link} to="/about">About</Nav.Link>
        <Nav.Link as={Link} to="/contact">Contact</Nav.Link> */}
      </Nav>
    </div>
  );
}

export default Sidebar;
