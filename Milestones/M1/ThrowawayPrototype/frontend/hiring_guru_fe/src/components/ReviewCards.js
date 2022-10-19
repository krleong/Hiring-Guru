import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import './ReviewCards.css';

function ReviewCards() {
  return (
    <Row xs={1} md={4} className="g-0">
      <Card>
        <Card.Img variant="top" src="https://gohire.io/hubfs/GoHire_May2022/Images/sebastian-lbarra-onecowork-sq-1.jpg" />
        <Card.Body>
          <Card.Title>"The Guru has improved our hiring process. We can now have time to focus on what truly matters: profits."</Card.Title>
          <Card.Text>
            Sebastian Ibarra, Specialist
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src="https://gohire.io/hubfs/GoHire_May2022/Images/luke-robbertse-glasswall-sq-1.jpg" />
        <Card.Body>
          <Card.Title>"Hiring Guru has made the task of posting a position almost effortless. Exactly what we were looking for."
          </Card.Title>
          <Card.Text>
            Dru Dalton, CEO
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src="https://gohire.io/hubfs/GoHire_May2022/Images/jorge-diaz-largo-hellotickets-sq-1.jpg" />
        <Card.Body>
          <Card.Title>"Hiring Guru has solved our hiring problems and we couldn’t be happier with it.</Card.Title>
          <Card.Text>
            Jorge Diaz Largo, CEO
          </Card.Text>
        </Card.Body>
      </Card>
    </Row >
  );
}

export default ReviewCards;