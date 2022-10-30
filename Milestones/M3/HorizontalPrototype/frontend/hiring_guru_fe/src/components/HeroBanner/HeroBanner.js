import React from 'react';
import './HeroBanner.css';
import JobSearch from "../../components/JobSearch/JobSearch";

function HeroBanner() {
    return (
        <div>
            <div id="heading">
                <h1 id="colorful">WE ARE THE #1 HIRING SOLUTIONS PLATFORM IN THE NATION!</h1>
                <h3 id="quoted">—CEO, Hiring Guru</h3>
            </div> 
            <JobSearch></JobSearch>
        </div>

    );
}

export default HeroBanner;