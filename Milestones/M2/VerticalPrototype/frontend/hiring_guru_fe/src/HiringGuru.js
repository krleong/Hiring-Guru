import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './pages/About/About'
import Landing from './pages/Landing/Landing'
import './HiringGuru.css';
import Member from './components/Member/Member';
import 'bootstrap/dist/css/bootstrap.min.css';

/*TESTING BOOTSTRAP*/
import Button from 'react-bootstrap/Button';

function HiringGuru() {
  return (
    <Router>
        <div>
          <h2>Hiring Guru</h2>
          <Button variant="outline-primary">Primary Button</Button>{' '} {/* TESTING BOOTSTRAP */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/about'} className="nav-link">About</Link></li>
          </ul>
          </nav>
          <hr />
          <Routes>
              <Route path='/' element={<Landing/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/about/members/:index/detail' element={<Member/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default HiringGuru;
