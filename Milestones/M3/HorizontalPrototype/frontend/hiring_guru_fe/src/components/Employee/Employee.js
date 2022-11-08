import { useParams } from 'react-router-dom';
import { EMPLOYEES } from '../../constants';
import './Employee.css';
import React from 'react';
import { useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Pagination from 'react-bootstrap/Pagination';
import '../../pages/Dashboard/Dashboard.css';

function Employee() {
    const params = useParams();
    const employee = EMPLOYEES[params.index]

    let active = 1;
    let items = [];
    for (let number = 1; number <= 1; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/dashboard/home">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/dashboard/teams">
                    My Teams
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Employees</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Employees</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="narrow-width"><Form>
                            <Form.Check
                                type={'checkbox'}
                                id={`default-checkbox`}
                                label={''}
                            />
                        </Form></th>
                        <th>Name</th>
                        <th>Position</th>
                        <th className="narrow-width">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {EMPLOYEES.map((employee, index) => {
                        return (
                            <tr>
                                <td>
                                    <Form>
                                        <Form.Check
                                            type={'checkbox'}
                                            id={`default-checkbox`}
                                            label={''}
                                        />
                                    </Form></td>
                                <td><a href="#/employee-info">{employee.name}</a></td>
                                <td>{employee.position}</td>
                                <td><DropdownButton id="dropdown-basic-button" title="Action">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div>
                <Pagination>{items}</Pagination>
            </div>
        </div>
    );
}

export default Employee;
