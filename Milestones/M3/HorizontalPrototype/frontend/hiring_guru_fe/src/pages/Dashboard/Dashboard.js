import React from 'react';
import { useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './Dashboard.css';
import SideNav from "../../components/SideNav/SideNav";

function Dashboard() {
    useEffect(() => {
        document.title = "Hiring Guru | Dashboard";
    }, []);

    return (
        <div>
            <SideNav />
            <div className="dashboard-container">
                <h1>Account Dashboard</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Item</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={`default-checkbox`}
                                        label={''}
                                    />
                                </Form></td>
                            <td><a href="#/employee-info">Kenny Leong</a></td>
                            <td>Lead Frontend Engineer</td>
                            <td><DropdownButton id="dropdown-basic-button" title="Action">
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </DropdownButton></td>
                        </tr>
                        <tr>
                            <td><Form>
                                <Form.Check
                                    type={'checkbox'}
                                    id={`default-checkbox`}
                                    label={''}
                                />
                            </Form></td>
                            <td><a href="#/employee-info">Mamadou Bah</a></td>
                            <td>Frontend Engineer</td>
                            <td> <DropdownButton id="dropdown-basic-button" title="Action">
                                <Dropdown.Item href={"#/action-1"}>Action</Dropdown.Item>
                                <Dropdown.Item href={"#/action-1"}>Another action</Dropdown.Item>
                                <Dropdown.Item href={"#/action-1"}>Something else</Dropdown.Item>
                            </DropdownButton></td>
                        </tr>
                        <tr>
                            <td><Form>
                                <Form.Check
                                    type={'checkbox'}
                                    id={`default-checkbox`}
                                    label={''}
                                />
                            </Form></td>
                            <td><a href="#/employee-info">Farhan Faider</a></td>
                            <td>Team Lead</td>
                            <td> <DropdownButton id="dropdown-basic-button" title="Action">
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </DropdownButton></td>
                        </tr>
                    </tbody>
                </Table>
            </div>

        </div >

    );
}

export default Dashboard;