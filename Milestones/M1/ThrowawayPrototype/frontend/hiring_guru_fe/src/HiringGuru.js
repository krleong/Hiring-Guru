import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './pages/About/About'
import Landing from './pages/Landing/Landing'
import './HiringGuru.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Member from './components/Member/Member';
import Button from 'react-bootstrap/Button';

function HiringGuru() {
  return (
    <Router>
        <div>
          <Button variant="primary">Primary</Button>{' '}
          <h2>Hiring Guru</h2>
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
          <div><center><h2 id = "title">Hiring Guru is the #1 hiring software in the nation!</h2></center></div>
            <div> <img class = "img1" src ="Image1.webp" alt = "test-img" /> </div>
               <div><h1 id = "header1">TAKE COMPLETE CONTROL</h1> </div>
               <div><h5 id = "chapter1">Easily orchestrate all your hiring campaigns from one place</h5></div>
              <div> <h5 id = "text1">Get full control of your entire hiring strategy and start making better decisions. 
                              Keep all candidates and hiring data stored securely in one place giving you total  
                              visibility across each hiring drive.</h5></div>
              <div> <img class = "img2" src ="Image2.webp" alt = "test2-img" /> </div>
               <div><h1 id = "header2">Reduce Hiring Costs</h1> </div>
               <div><h5 id = "chapter2">Be smarter and significantly decrease your hiring spend</h5></div>
              <div> <h5 id = "text2">Wasting too much money recruiting people? With GoHire, 
              you get all the hiring tools you need. Publish to 15+ job sites with one click, 
              for free, and get 100’s of candidates for every job you advertise.</h5></div>
              <div> <img class = "img3" src ="Image3.webp" alt = "test2-img" /> </div>
               <div><h1 id = "header3">SAVE MORE TIME</h1> </div>
               <div><h5 id = "chapter3">Cut time to hire and increase efficiency across your business</h5></div>
              <div> <h5 id = "text3">Up your team’s ability to continually improve how you hire with 
              specific job and candidate reporting, ensuring you aren’t wasting time finding, selecting 
              and hiring the best candidates.</h5></div>
              <div> <img class = "img4" src ="Image4.webp" alt = "test2-img" /> </div>
               <div><h1 id = "header4">HIRE BETTER PEOPLE</h1> </div>
               <div><h5 id = "chapter4">Increase top hires and select the best people for the job</h5></div>
              <div> <h5 id = "text4">Get all the tools you need to evaluate every candidate quickly. 
              Choose from an array of selection tools like screening questions, questionnaires and 
              evaluations to make better hiring decisions.</h5></div>
        </div> 
      </Router>
      
  );
}

export default HiringGuru;


     
      
  