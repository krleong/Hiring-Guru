import './ApplyForJob.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function ApplyJob() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };


    const dt = null;
    const [cdate, setDate] = useState(dt);
    const handleDateTime = () => {
        let dt = new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString()
        setDate(dt);
        alert("Application submitted successfully: " + dt + ".");
    }

    return (
        <div className="job-apply-container">
            <h1>Apply for Job</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="text" placeholder="###-###-####" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid phone number.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom05">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="email@example.com" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Upload resume/cover letter (PDF only)</Form.Label>
                        <Form.Control type="file" multiple accept="application/pdf" />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button type="submit" onClick={handleDateTime} href={'/'}>Submit application</Button>
            </Form>
        </div>
    );
}
        // <div className="job-apply-container">
        //     <h1>Apply for Job</h1>
        //     <label for="basic-url" className="form-label">Name</label>
        //     <div className="input-group mb-3">
        //         <input type="text" className="form-control" placeholder="First name" aria-label="First name" />
        //         <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
        //     </div>
        //     <label for="basic-url" className="form-label">Phone number</label>
        //     <div className="input-group mb-3">
        //         <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Country code</button>
        //         <ul className="dropdown-menu">
        //             <li><a className="dropdown-item">United States (+1)</a></li>
        //             <li><hr className="dropdown-divider" /></li>
        //             <li><a className="dropdown-item">Other</a></li>
        //         </ul>
        //         <input type="text" className="form-control" aria-label="Phone number" placeholder="###-###-####" />
        //     </div>
        //     <label for="basic-url" className="form-label">Email</label>
        //     <div className="input-group mb-3">
        //         <input type="email" className="form-control" placeholder="email@domain.com" aria-label="First name" />
        //     </div>
        //     <label for="basic-url" className="form-label">Upload resume/cover letter (PDF only)</label>
        //     <div className="input-group mb-3">
        //         <input type="file" className="form-control" id="inputGroupFile02" accept="application/pdf" />
        //     </div>
        //     <Button className="submit-form-button" type="submit" href={'/'} onClick={handleDateTime}>Submit</Button>
        // </div>
//     );
// }
