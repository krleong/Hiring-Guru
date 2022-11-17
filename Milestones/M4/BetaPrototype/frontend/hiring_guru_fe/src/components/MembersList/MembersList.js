import { MEMBERS } from '../../constants'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function MembersList() {
    return (
        <div className='members-list-comp-root'>
            <div className='members-list-container'>
                <Card>
                    <Card.Body>
                        <Card.Title>Here's the list of engineers working on Hiring Guru</Card.Title>
                        <Card.Text>
                            Click on each team member's name to read their bio:
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item key={'spajksndjkansd'}>
                            {MEMBERS.map((member, index) => {
                                return (
                                    <li key={'member' + index.toString()}>
                                        <a href={`/about/members/${index}/detail`}>{member.name}</a>
                                    </li>
                                )
                            })}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </div>
    );
}

export default MembersList;
