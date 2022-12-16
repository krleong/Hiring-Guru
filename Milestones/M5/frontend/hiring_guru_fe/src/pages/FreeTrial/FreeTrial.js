import './FreeTrial.css';
import Button from 'react-bootstrap/Button';

function FreeTrial() {
    return (
            <div className={"grid2-container"}>
                <center><center/>
               
            <div className={"Welcome-container"}>
                <h1>Welcome to the HiringGuru, Start your Free Trial Today</h1>
            </div>
            <div className={"Tips-container"}>
                <h2>What can you do with your free trial?</h2>
            </div>
            <div className={"Info-container"}>
                <h5>Easily build tests and assess up to multiple candidates * 
                    Improve your interviews with a collaborative coding environment *  
                    Save and replay any interview all in a single location * 
                    Reach out to support 24 hours a day, 5 days a week * 
                    Access the largest library of hiring questions in the world * 
                    all free for 30 days, no credit card required</h5>
            </div>
            <div className={"Submit-container1"}>
            <Button href={'/free-trial'} id="free-trial-btn" variant="primary">Start Today</Button>
            </div>
                 
            </center>
            </div>
    );
}
export default FreeTrial;