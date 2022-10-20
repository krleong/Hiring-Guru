import React, { Component } from 'react';
import ProductFeatures from '../../components/ProductFeatures/ProductFeatures';
import HeroBanner from "../../components/HeroBanner/HeroBanner";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className={'landing-page'}>
          <div className={'landing-page-body'} >
            <div className={'container'}>
              <HeroBanner></HeroBanner>
              <ProductFeatures></ProductFeatures>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;