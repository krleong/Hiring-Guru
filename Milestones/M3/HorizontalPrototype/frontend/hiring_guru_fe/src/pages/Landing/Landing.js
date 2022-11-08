import React, { Component } from 'react';
import ProductFeatures from '../../components/ProductFeatures/ProductFeatures';
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import JobSearch from "../../components/JobSearch/JobSearch";
import ReviewCards from "../../components/ReviewCards/ReviewCards";
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div>
        <div className={'landing-page'}>
          <div className={'landing-page-body'} >
            <div className={'container'}>
              <HeroBanner text1="WE ARE THE #1 HIRING SOLUTIONS PLATFORM IN THE NATION!" text2="—CEO, Hiring Guru"/>
              <JobSearch/>
              <ProductFeatures/>
              <hr />
              <div><h5 id="review-header" className="chapter">See what our customers have to say</h5></div>
              <ReviewCards></ReviewCards>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;