import './ApplyForJob.css';
import Button from 'react-bootstrap/Button';

function ApplyJob() {
    return (
        <div className="job-apply-container">
            <h1>Apply for Job</h1>
            <label for="basic-url" className="form-label">Name</label>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="First name" aria-label="First name"    />
                <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
            </div>
            <label for="basic-url" className="form-label">Phone number</label>
            <div className="input-group mb-3">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Country code</button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item">United States (+1)</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item">Other</a></li>
                </ul>
                <input type="text" className="form-control" aria-label="Phone number" placeholder="###-###-####" />
            </div>
            <label for="basic-url" className="form-label">Email</label>
            <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="email@domain.com" aria-label="First name" />
            </div>
            <label for="basic-url" className="form-label">Upload resume/cover letter (PDF only)</label>
            <div className="input-group mb-3">
                <input type="file" className="form-control" id="inputGroupFile02" accept="application/pdf" />
            </div>
            <Button className="submit-form-button" type="submit">Submit</Button>
        </div>
    );
}

export default ApplyJob;
