import React from 'react';
import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
// import Table from 'react-bootstrap/Table';
// import Form from 'react-bootstrap/Form';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SideNav from "../../components/SideNav/SideNav";
import Employee from "../../components/Employee/Employee";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import './Dashboard.css';

export default function Dashboard() {
    useEffect(() => {
        document.title = "Hiring Guru | Dashboard";
    }, []);

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(current => !current);
    };

    return (
        <div>
            <SideNav />             {/* sidebar shifts content to right when expanded - BUG WHERE NOT SHIFTED ON PAGE LOAD, REQUIRES BUTTON CLICK FIRST*/}
            <div className="dashboard-container" style={{
                // active | inactive
                margin: isActive ? '5em auto auto 26%' : '5em auto auto auto',

            }}>
                <a className="btn btn-outline-primary sidebar-toggle-btn" data-bs-toggle="collapse" onClick={handleClick}
                    href="#side-nav-bar" role="button" aria-expanded="false" aria-controls="collapseExample"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-layout-sidebar" viewBox="0 0 16 16">
                        <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2V2z" />
                    </svg> Toggle Sidebar</a>
                <Routes>
                    <Route path='/home' element={<div><Breadcrumb>
                        <Breadcrumb.Item href="/dashboard/home">Dashboard</Breadcrumb.Item>
                    </Breadcrumb><h1>Dashboard Home</h1><HeroBanner text1="WELCOME, {{user}}!" text2="Click on Sidebar to navigate the Dashboard." /></div>} />
                </Routes>
                <Routes>
                    <Route path='/employees' element={<Employee />} />
                </Routes>
                {/* <Routes>
                    <Route path='/roles' element={<Role />} />
                </Routes> */}
                {/* <Routes>
                    <Route path='/positions' element={<Position />} />
                </Routes> */}
            </div>

        </div >

    );
}