import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './HiringGuru.css';
import About from './pages/About/About'
import Landing from './pages/Landing/Landing'
import JobPosts from './pages/JobPosts/JobPosts'
import Pricing from './pages/Pricing/Pricing'
import LogIn from './pages/LogIn/LogIn'
import SignUp from './pages/SignUp/SignUp'
import CreateCompany from './pages/CreateCompany/CreateCompany'
import Dashboard from './pages/Dashboard/Dashboard'
import Member from './components/Member/Member';
import NavBar from './components/NavBar/NavBar.js';
import Footer from './components/Footer/Footer.js';

import Tagline from './components/Tagline/Tagline.js';

function HiringGuru() {

  return (
    <Router>
      <div>
        <div className="page-wrapper">
          <div className="sticky-top-follow">
            <Tagline></Tagline>
            <NavBar></NavBar>
          </div>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/jobs' element={<JobPosts />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/create-company' element={<CreateCompany />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/about/members/:index/detail' element={<Member />} />
          </Routes>
        </div>
          <Footer></Footer>
      </div>
    </Router>
  );
}

export default HiringGuru;