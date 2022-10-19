import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './HiringGuru.css';
import About from './pages/About/About'
import Landing from './pages/Landing/Landing'
import Member from './components/Member/Member';
import NavBar from './components/NavBar/NavBar.js';
import Footer from './components/Footer/Footer.js';

import Tagline from './components/Tagline/Tagline.js';

function HiringGuru() {
  return (
    <Router>
      <div>
        <div class="sticky">
          <Tagline></Tagline>
          <div id="divider"></div>
          <NavBar></NavBar>
        </div>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/about' element={<About />} />
          <Route path='/about/members/:index/detail' element={<Member />} />
        </Routes>
      </div>
      <Footer></Footer>
    </Router>
  );
}

export default HiringGuru;