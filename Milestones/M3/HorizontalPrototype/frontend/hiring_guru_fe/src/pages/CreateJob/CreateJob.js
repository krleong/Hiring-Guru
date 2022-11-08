import './CreateJob.css';
import Button from 'react-bootstrap/Button';


function CreateJob() {
    return (
            <div class="gridJob-container">
            <div>
                <h1 class="createJob">Post your Job Today!</h1>
            </div>
            <div className="JobTitle-container">
                <h5>Job Title</h5>
                <label for="JobTitle"></label>
                <input type="text" id="JobTitle" name="JobTitle" placeholder="Software Engineer"></input>
            </div>
            <div className="JobType-container">
                <h5>Job Type</h5>
                <label for="JobType"></label>
                <input type="text" id="JobType" name="JobType" placeholder="Full-Time, Part-Time, Internship"></input>
            </div>
            <div className="Salary-container">
                <h5>Expected Salary Range</h5>
                <label for="Salary"></label>
                <input type="text" id="Salary" name="Salary" placeholder="$80,000 - $100,000"></input>
            </div>
            <div className="Location-container">
                <h5>Location</h5>
                <label for="Location"></label>
                <input type="text" id="Location" name="Location" placeholder="On-site, Remote, Hybrid"></input>
            </div>
            <div className="Company-container">
                <h5>Company</h5>
                <label for="Company"></label>
                <input type="text" id="Company" name="Company" placeholder="Hiring Guru"></input>
            </div>
            <div className="Experience-container">
                <h5>Experience Level</h5>
                <label for="Experience"></label>
                <input type="text" id="Experience" name="ComExperiencepany" placeholder="Entry, Jr, Senior"></input>
            </div>
            <div className="Description-container">
                <h5>Job Description</h5>
                <label for="Description"></label>
                <textarea id="Description" name="Description" rows="10" cols="40"></textarea>
            </div>
            <div className="Qualifications-container">
                <h5>Qualifications</h5>
                <label for="Qualifications"></label>
                <textarea id="Qualifications" name="Qualifications" rows="10" cols="40"></textarea>
            </div>
            <div className="CompanyDesc-container">
                <h5>Company Description</h5>
                <label for="CompanyDesc"></label>
                <textarea id="CompanyDesc" name="CompanyDesc" rows="10" cols="40"></textarea>
            </div>
            <div className="Submit2-container">
            <Button href={'/free-trial'} id="free-trial-btn" variant="primary">Post Job</Button>
            </div>
            </div>

          
    
    );
}

export default CreateJob;