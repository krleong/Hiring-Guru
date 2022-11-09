import React, { Component } from "react";
import './HeroBanner.css';

class HeroBanner extends Component {
    state = {
        text1: this.props.text1,
        text2: this.props.text2

    };

    render() {
        return (
            <div>
                <div className="heading">
                    <h1 className="colorful">{this.props.text1}</h1>
                    <h3 className="quoted">{this.props.text2}</h3>
                </div>
            </div>
        )
    }
}

export default HeroBanner;