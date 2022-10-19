import React, { Component } from 'react';
import ProductFeatures from '../../components/ProductFeatures';
import JobSearch from "../../components/JobSearch/JobSearch";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className={'landing-page'}>
          <h2>This is the landing page</h2>
          <div className={'landing-page-body'} >
            <div className={'container'}>
              <JobSearch></JobSearch>
              <ProductFeatures></ProductFeatures>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;