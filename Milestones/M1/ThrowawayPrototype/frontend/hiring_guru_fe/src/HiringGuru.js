import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './pages/About/About'
import Landing from './pages/Landing/Landing'
import './HiringGuru.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Member from './components/Member/Member';
import NavBar from './components/NavBar.js';
import Tagline from './components/Tagline.js';


function HiringGuru() {
  return (
    <Router>
      <div>
        <Tagline></Tagline>
      <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/about' element={<About />} />
          <Route path='/about/members/:index/detail' element={<Member />} />
        </Routes>
      </div>
      <div>TEST<img class="mamadou-img" src="assets/20221010_151346.jpg" alt="test-img" />
        </div>
    </Router>
  );
}

export default HiringGuru;
