import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import './NavBar.css';

// import Landing from '../pages/Landing/Landing'
// import NavTabs from '../components/NavTabs';
// import { Link } from "react-router-dom";

export default function NavBar(props) {
    // const [username] = React.useState(localStorage.getItem('user'));
    // const [logged] = React.useState(localStorage.getItem('logged'));

    // const handleLogOut = () => {
    //     localStorage.removeItem('logged');
    //     localStorage.removeItem('user');
    //     localStorage.removeItem('userid');
    // }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href={'/'}>Hiring Guru</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href={'/'}>Home</Nav.Link>
                            <Nav.Link href={'/jobs'}>Job Posts</Nav.Link>
                            <Nav.Link href={'/pricing'}>Pricing</Nav.Link>
                            <Nav.Link href={'/about'}>About Us</Nav.Link>
                            <NavDropdown title="DEV" id="collasible-nav-dropdown">
                                <NavDropdown.Item href={'/create-company'}>Company Creation</NavDropdown.Item>
                                <NavDropdown.Item href={'/dashboard/home'}>Account Dashboard</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Button href={'/login'} id="login-btn" variant="outline-primary">Log In</Button>
                            <Button href={'/signup'} id="signup-btn" variant="primary">Get Started</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}