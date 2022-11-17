import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import './NavBar.css';
// import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { PersonCircle } from 'react-bootstrap-icons';


export default function NavBar(props) {
    // const [username] = React.useState(localStorage.getItem('user'));
    // const [logged] = React.useState(localStorage.getItem('logged'));
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

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
                        </Nav>
                        <Nav>
                            {
                                isAuthenticated ? <div>
                                    <NavDropdown class="dev-dropdown-menu" title={<span><PersonCircle size={28} style={{marginRight: 3}}/>     Account</span>} id="collasible-nav-dropdown">
                                        <NavDropdown.Item href={'/dashboard/home'}>Dashboard</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href={'/create-company'}>Create Company</NavDropdown.Item>
                                        <NavDropdown.Item href={'/job-apply'}>Apply For Job</NavDropdown.Item>
                                        <NavDropdown.Item href={'/job-referral'}>Job Referral</NavDropdown.Item>
                                    </NavDropdown><Button id="logout-btn"
                                        variant="outline-primary" onClick={() => logout({ returnTo: window.location.origin })}>
                                        Log Out
                                    </Button></div> :
                                    <Button id="login-btn"
                                        variant="outline-primary" onClick={() => loginWithRedirect({
                                            redirectUri: `${window.location.origin}/dashboard/home`
                                        })}>
                                        Log In
                                    </Button>
                            }
                            {
                                !isAuthenticated &&
                                <Button id="signup-btn" variant="primary"
                                    onClick={() => loginWithRedirect({
                                        redirectUri: `${window.location.origin}/create-company`
                                    })}
                                >Get Started</Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}