import { useParams } from 'react-router-dom';
import { MEMBERS } from '../../constants';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Member.css';

function Member() {
    const params = useParams();
    const member = MEMBERS[params.index]
    return (
        <div className='members-root-container'>
            <h1>Team Member</h1>
            <Card>
            <Card.Header id="role">{member.role}</Card.Header>
                <Card.Body>
                    <Card.Title id="name">{member.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" id="email">{member.email}</Card.Subtitle>
                    <Card.Text id="desc">{member.description.toString()}
                    </Card.Text>
                    <Button variant="primary" href={'/about'}>Back</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Member;
