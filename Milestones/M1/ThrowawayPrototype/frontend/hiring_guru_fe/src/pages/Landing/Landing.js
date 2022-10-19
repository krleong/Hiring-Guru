import React, { Component } from 'react';
import JobSearch from "../../components/JobSearch/JobSearch";

class Landing extends Component {
  render() {
    return (
        <div className={'landing-page'}>
            <h2>This is the landing page</h2>
            <div className={'landing-page-body'} >
                <div className={'container'}>
                    <JobSearch></JobSearch>
                </div>
            </div>
        </div>
    );
  }
}

export default Landing;