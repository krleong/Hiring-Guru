import './CreateCompany.css';
import Button from 'react-bootstrap/Button';
import {useAuth0} from "@auth0/auth0-react";


function CreateCompany() {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    return (
            <div className="gridM-container">
                <h1 className ="heading1">Create your Company Today!</h1>
            <div className="Fullname-container">
                <h5>Full Name</h5>
                <label for="Fullname"></label>
                <input type="text" id="Fullname" name="FullName" placeholder="Jane Doe"></input>
            </div>
            <div className="CompanyName-container">
                <h5>Company Name</h5>
                <label for="CompanyName"></label>
                <input type="text" id="CompanyName" name="CompanyName" placeholder="Hiring Guru"></input>
            </div>
            <div className="Address-container">
                <h5>Company Address</h5>
                <label for="Address"></label>
                <input type="text" id="Address" name="Address" placeholder="750 Holloway Blvd"></input>
                </div>
 
            <div className="Address2-container">
                <h5>State, City, Zip Code</h5>
                <label for="Address2"></label>
                <input type="text" id="Address2" name="Address2" placeholder="San Francisco, CA, 94132"></input>
            </div>
            <div className="PhoneNumber-container">
                <h5>Phone Number</h5>
                <label for="PhoneNumber"></label>
                <input type="text" id="PhoneNumber" name="PhoneNumber" placeholder="123-456-7890"></input>
            </div>
            <div className="CompanyEmail-container">
                <h5>Company Email</h5>
                <label for="CompanyEmail"></label>
                <input type="text" id="CompanyEmail" name="CompanyEmail" placeholder="@Guru.com"></input>
            </div>
                     
            <div className="Submit-container">
            <Button id="free-trial-btn" variant="primary"
            onClick={() => {
                loginWithRedirect({
                    redirectUri: `${window.location.origin}/dashboard`
                })
            }}>Create Company</Button>
            </div>
            
            </div>

          
    
    );
}

export default CreateCompany;
