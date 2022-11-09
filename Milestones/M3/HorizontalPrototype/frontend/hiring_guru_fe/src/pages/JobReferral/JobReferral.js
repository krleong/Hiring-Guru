import './JobReferral.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function JobReferral() {
    return (
        
        <Container>
      <Form>
        <Form.Group className="RefName" controlId="exampleForm.ControlInput1">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="email" placeholder="Kenny Leong" />
        </Form.Group>
        <Form.Group className="RefEmail" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Select aria-label="Default select example">
        <option>Choose the job you want to refer to</option>
        <option value="1">Job 1</option>
        <option value="2">Job 2</option>
        <option value="3">Job 3</option>
    </Form.Select>
        <Form.Group className="RefReason" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Why are you referring this candidate?</Form.Label>
          <Form.Control as="textarea" rows={3} columns={2} />
        </Form.Group>
        <Form.Group controlId="RefForm" className="mb-3">
        <Form.Label>Submit Resume Here</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
      </Container>
    );
  }
export default JobReferral;