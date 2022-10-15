import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';

// import Landing from '../pages/Landing/Landing'

import Button from './Button';
// import NavTabs from '../components/NavTabs';
import { Link } from "react-router-dom";
// import {FiLogOut, FiLogIn, FiUser, FiUserPlus} from 'react-icons/fi'

export default function NavBar(props) {
    const [username] = React.useState(localStorage.getItem('user'));
    const [logged] = React.useState(localStorage.getItem('logged'));

    const handleLogOut = () => {
        localStorage.removeItem('logged');
        localStorage.removeItem('user');
        localStorage.removeItem('userid');
    }

    return (
        <div id="nav-container">
            <nav class="navbar navbar-light navbar-expand-lg bg-light" >
                <a class="navbar-brand" href={'/'}><h2>Hiring Guru</h2></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href={'/'}>Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href={'/'}>Job Posts</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href={'/'}>Pricing</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href={'/about'}>About Us</a>
                        </li>
                        <li class="nav-item">
                            <div id="account-buttons">
                                <button type="button" id="loginBtn" class="btn btn-outline-primary">Login</button>
                                <button type="button" id="signupBtn" class="btn btn-primary">Get Started</button>
                            </div>
                        </li>
                        {/* <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li> */}
                        {/* <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                    </li> */}
                    </ul>
                    {/* <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
                </div>
            </nav >
        </div>
    );
}