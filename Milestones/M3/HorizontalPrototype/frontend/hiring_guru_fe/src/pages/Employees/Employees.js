// import { useParams } from 'react-router-dom';
import { EMPLOYEES } from '../../constants';
import './Employees.css';
import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Pagination from 'react-bootstrap/Pagination';
import GeneralSearch from '../../components/GeneralSearch/GeneralSearch';

function Employees() {
    // const params = useParams();
    // const employee = EMPLOYEES[params.index]

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
                <Breadcrumb.Item active>Company Management: Employees</Breadcrumb.Item>
            </Breadcrumb>
            <GeneralSearch />

            <h1>Employees</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th><Form>
                            <Form.Check
                                type={'checkbox'}
                                id={`default-checkbox`}
                                label={''}
                            />
                        </Form></th>
                        <th className="wide-width">Name</th>
                        <th className="wide-width">Position</th>
                        <th className="wide-width">Company</th>
                        <th>Action</th>
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
                                <td>{employee.company}</td>
                                <td><DropdownButton id="dropdown-basic-button" title="Action">
                                    <Dropdown.Item href="#/action-1">Contact</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Edit Details</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="#/action-3">Remove</Dropdown.Item>
                                </DropdownButton></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div>
                {/* For individual pagination elements  */}
                {/* <Pagination>{items}</Pagination> */}
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Ellipsis />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        </div>
    );
}

export default Employees;
