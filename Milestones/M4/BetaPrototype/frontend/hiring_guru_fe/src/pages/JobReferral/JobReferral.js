import './JobReferral.css';
import Button from 'react-bootstrap/Button';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import LogIn from '../LogIn/LogIn';

const JobReferral = () => {
    return (
        <div className="job-apply-container">
            <h1>Submit a Job Referral</h1>
            <label for="basic-url" className="form-label">Full Name</label>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="First name" aria-label="First name" />
                <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
            </div>
            <label for="basic-url" className="form-label">Email</label>
            <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="Phone number" placeholder="@example.com" />
            </div>
            <form>
                <label for="basic-url" className="form-label">Why this Candidate</label>
                <textarea rows="5" cols="102"></textarea>
            </form>
            <label for="basic-url" className="form-label">Upload their resume/cover letter</label>
            <div className="input-group mb-3">
                <input type="file" className="form-control" id="inputGroupFile02" />
            </div>
            <Button href={'/job-referral2'} variant="primary">Submit
            </Button>
        </div>
    );
}

export default withAuthenticationRequired(JobReferral, {
    // onRedirecting: () => <LogIn />
});
