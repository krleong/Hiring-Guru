import './CreateCompany.css';
import Button from 'react-bootstrap/Button';
import {useAuth0} from "@auth0/auth0-react";
import Form from 'react-bootstrap/Form';


function CreateCompany() {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    return (
            <div className="gridM-container">
                <h1 className ="heading1">Create your Company Today!</h1>
        <div className="CompanyName-container">
            <Form>
        <Form.Group className="CompanyName" controlId="exampleForm.ControlInput1"> </Form.Group>
        <Form.Label>Company Name</Form.Label>
        <Form.Control type="email" placeholder="Hiring Guru" />
        </Form>
        </div>
        <div className="CompanySite-container">
            <Form>
        <Form.Group className="CompanySite" controlId="exampleForm.ControlInput1"> </Form.Group>
        <Form.Label>Company Website</Form.Label>
        <Form.Control type="email" placeholder="www.HiringGuru.com" />
        </Form>
        </div>

        <div className="Industry-container">
            <Form>
        <Form.Group className="Industry" controlId="exampleForm.ControlInput1"> </Form.Group>
        <Form.Label>Industry</Form.Label>
        <Form.Control type="email" placeholder="Technology" />
        </Form>
        </div>

        <div className="ContactNumber-container">
            <Form>
        <Form.Group className="ContactNumber" controlId="exampleForm.ControlInput1"> </Form.Group>
        <Form.Label>Contacts Phone Number</Form.Label>
        <Form.Control type="email" placeholder="@example.com" />
        </Form>
        </div>
        <div className="ContactEmail-container">
            <Form>
        <Form.Group className="ContactEmail" controlId="exampleForm.ControlInput1"> </Form.Group>
        <Form.Label>Contacts Email</Form.Label>
        <Form.Control type="email" placeholder="123-456-7890" />
        </Form>
        </div>
        <div className="CompanyEmail-container">
            <Form>
        <Form.Group className="CompanyEmail" controlId="exampleForm.ControlInput1"> </Form.Group>
        <Form.Label>Company Email</Form.Label>
        <Form.Control type="email" placeholder="@Guru.com" />
        </Form>
        </div>
        
        <div className="OrgSize-container">
            <Form>
        <Form.Select aria-label="Default select example">
        <Form.Label>Organization Size</Form.Label>
        <option>Organization Size</option>
        <option value="1">0-1 employees</option>
        <option value="1">2-10 employees</option>
        <option value="1">11-50 employees</option>
        <option value="1">51-200 employees</option>
        <option value="1">201-500 employees</option>
        <option value="1">501-1,000 employees</option>
        <option value="1">1,001-5,000 employees</option>
        <option value="1">5,001-10,000 employees</option>
        <option value="1">10,000+ employees</option>
    </Form.Select>
        </Form>
        </div>
        <div className="OrgType-container">
            <Form>
        <Form.Select aria-label="Default select example">
        <Form.Label>Organization Size</Form.Label>
        <option>Organization Type</option>
        <option value="1">Public Company</option>
        <option value="1">Self-Employed</option>
        <option value="1">Government Agency</option>
        <option value="1">Nonprofit</option>
        <option value="1">Privately Held</option>
        <option value="1">Partnership</option>
    </Form.Select>
        </Form>
        </div>

        <div className="Checkbox-container">
        <Form.Group className="Checkbox" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="I verify that I am an authorized representative of this 
    organization and have the right to act on its behalf in the creation and management of this page. " />
  </Form.Group>
        </div>

        
            <div className="Submit-container">
              <Button id="free-trial-btn" variant="primary"
              onClick={() => {
                  loginWithRedirect({
                      redirectUri: `${window.location.origin}/dashboard/home`
                  })
              }}>Create Company</Button>
            </div>
            
            </div>
            
          
    
    );
}

export default CreateCompany;
