import React, { Component } from 'react';
import MembersList from '../../components/MembersList/MembersList'
import './About.css';

class About extends Component {
  render() {
    return (
      <div className="about-us-container">
        <h1>About Us</h1>
        <MembersList />
      </div >
    );
  }
}

export default About;