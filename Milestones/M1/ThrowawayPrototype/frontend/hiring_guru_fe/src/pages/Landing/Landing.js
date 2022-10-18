import React, { Component } from 'react';
import ProductFeatures from '../../components/ProductFeatures';

class Landing extends Component {
  render() {
    return (
        <div>
            {/* <h2>This is the landing page</h2> */}
            <ProductFeatures></ProductFeatures>
        </div>
    );
  }
}

export default Landing;