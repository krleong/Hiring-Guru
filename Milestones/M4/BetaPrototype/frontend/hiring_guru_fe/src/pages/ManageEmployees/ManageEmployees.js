import './ManageEmployees.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import React, { useContext, useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Filter } from "react-bootstrap-icons";
import DropdownItem from "react-bootstrap/DropdownItem";
import { Dialog } from "../../components/Dialog/Dialog";
import { ApplicationContext } from "../../HiringGuru";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BASE_URL } from "../../components/configuration";

function EmployeeEditDialog(props) {
    return (
        <Dialog
            show={props.show}
            title={props.title}
            actions={props.actions}
        >
            <div>
                <div className={"recruitment-step-errors"}>
                    {
                        props.errors.map((error, index) => {
                            return (
                                <div key={`create-rect-step-error-${index}`} className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageNameInput" className="form-label">
                        Name
                    </label>
                    <input className="form-control" id="recruitmentStageNameInput"
                        placeholder="First name Last name"
                        value={props.name}
                        onChange={props.onNameChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Email
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="email@example.com"
                        value={props.email}
                        onChange={props.onEmailChange}
                    >
                    </input>
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Created At
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="Year-Month-DayTHour:Minute:Second.TimeZone"
                        value={props.createdAt}
                        onChange={props.onCreatedAtChange}
                        disabled={true}
                    >
                    </input>
                </div> */}
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Company Designation
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="Enter company name"
                        value={props.designation}
                        onChange={props.onDesignationChange}
                    >
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Role(s)
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="Enter assigned role(s)"
                        value={props.roles}
                        onChange={props.onRolesChange}
                    >
                    </input>
                </div>
            </div>
        </Dialog>
    )
}

const EmployeePageStatus = {
    NotStarted: "NotStarted",
    InProgress: "InProgress",
    Error: "Error",
    Success: "Success",
}

const parseEmployees = (employees) => {
    let parsedEmployees = []
    for (let i = 0; i < employees.length; i++) {
        parsedEmployees.push({
            id: employees[i].id,
            name: employees[i].user.name,
            email: employees[i].user.email,
            createdAt: employees[i].createdAt,
            designation: employees[i].designation,
            roles: employees[i].roles,
        })
    }
    return parsedEmployees
}


export function ManageEmployees() {
    const [employeePageState, setPageState] = useState({
        listOfEmployees: [],
        searchString: '',
        getEmployeeListRequestStatus: EmployeePageStatus.NotStarted,
        searchFetchError: '',
    })

    const { SearchBar } = Search;

    useEffect(() => {
        fetchEmployees()
    }, []);

    const [editDialogState, setEditDialogState] = useState({
        show: false,
        name: "",
        email: "",
        // createdAt: "",
        designation: "",
        roles: "",
        errors: [],
        index: undefined
    })

    const [createDialogState, setCreateDialogState] = useState({
        show: false,
        name: "",
        email: "",
        // createdAt: "",
        designation: "",
        roles: "",
        errors: [],
        index: undefined
    })

    const appContext = useContext(ApplicationContext);

    const fetchEmployees = () => {
        setPageState({
            ...employeePageState,
            listOfEmployees: [],
            getEmployeeListRequestStatus: EmployeePageStatus.InProgress,
            searchFetchError: ''
        })

        axios({
            // url: `${BASE_URL}/api/v1/companies/177/employees`,
            // TEMP FIX: GET ALL EMPLOYEES FOR COMPANY ID 177
            url: `${BASE_URL}/api/v1/companies/` + 177 + `/employees`,
            method: 'get',
            timeout: 10000,
        }).then((resp) => {
            if (resp.status === 200) {
                setPageState({
                    ...employeePageState,
                    listOfEmployees: parseEmployees(resp.data),
                    getEmployeeListRequestStatus: EmployeePageStatus.Success,
                })
            }
            else {
                setPageState({
                    ...employeePageState,
                    listOfEmployees: [],
                    getEmployeeListRequestStatus: EmployeePageStatus.Error,
                    searchFetchError: 'There was an error fetching the list of employees. Please try again later'
                })
            }
        }).catch((error) => {
            setPageState({
                ...employeePageState,
                listOfEmployees: [],
                getEmployeeListRequestStatus: EmployeePageStatus.Error,
                searchFetchError: 'There was an error fetching the list of employees. Please try again later'
            })
        })
    }

    const removeEmployee = (index) => {
        axios({
            url: `${BASE_URL}/api/v1/companies/177/employees/` + employeePageState.listOfEmployees[index].id,
            method: 'delete',
            timeout: 10000,
        }).then((resp) => {
            if (resp.status === 200) {
                fetchEmployees()
            }
            else {
                setPageState({
                    ...employeePageState,
                    listOfEmployees: [],
                    deleteEmployeeListRequestStatus: EmployeePageStatus.Error,
                    searchFetchError: 'There was an error deleting the employee. Please try again later'
                })
            }
        }).catch((error) => {
            setPageState({
                ...employeePageState,
                listOfEmployees: [],
                deleteEmployeeListRequestStatus: EmployeePageStatus.Error,
                searchFetchError: 'There was an error deleting the employee. Please try again later'
            })
        })

        let newEmployees = []
        for (let i = 0; i < employeePageState.listOfEmployees.length; i++) {
            i !== index && newEmployees.push(employeePageState.listOfEmployees[i])
        }
        appContext.closeDialog()
        setPageState({
            ...employeePageState,
            listOfEmployees: newEmployees
        })
    }

    const createEmployee = () => {
        let errors = []
        if (!createDialogState.name || createDialogState.name.length === 0) {
            errors.push("Employee name cannot be empty")
        }
        if (!createDialogState.email || createDialogState.email.length === 0) {
            errors.push("Employee email cannot be empty")
        }
        // if (!createDialogState.createdAt || createDialogState.createdAt.length === 0) {
        //     errors.push("Employee creation date cannot be empty")
        // }
        if (!createDialogState.designation || createDialogState.designation.length === 0) {
            errors.push("Employee designation cannot be empty")
        }
        if (!createDialogState.roles || createDialogState.roles.length === 0) {
            errors.push("Employee roles cannot be empty")
        }
        if (errors.length > 0) {
            setCreateDialogState({
                ...createDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            axios({
                url: `${BASE_URL}/api/v1/companies/177/employees`,
                method: 'post',
                timeout: 10000,
                data: {
                    name: createDialogState.name,
                    designation: createDialogState.designation,
                    email: createDialogState.email,
                    auth0Id: createDialogState.auth0Id,
                    roles: createDialogState.roles,
                }
            }).then((resp) => {
                if (resp.status === 200) {
                    fetchEmployees()
                }
                else {
                    setPageState({
                        ...employeePageState,
                        listOfEmployees: [],
                        postEmployeeListRequestStatus: EmployeePageStatus.Error,
                        searchFetchError: 'There was an error adding to the list of employees. Please try again later'
                    })
                }
            }).catch((error) => {
                setPageState({
                    ...employeePageState,
                    listOfEmployees: [],
                    postEmployeeListRequestStatus: EmployeePageStatus.Error,
                    searchFetchError: 'There was an error adding to the list of employees. Please try again later'
                })
            })

            setPageState({
                ...employeePageState,
                listOfEmployees: [
                    ...employeePageState.listOfEmployees,
                    {
                        name: createDialogState.name,
                        designation: createDialogState.designation,
                        email: createDialogState.email,
                        // createdAt: createDialogState.createdAt,
                        roles: createDialogState.roles,
                    }
                ],
            })
            setCreateDialogState({
                ...createDialogState,
                show: false,
            })
        }
    }


    const columns = [
        {
            dataField: 'name',
            text: 'Name'
        },
        {
            dataField: 'email',
            text: 'Email'
        },
        {
            dataField: 'createdAt',
            text: 'Date Added'
        },
        {
            dataField: 'designation',
            text: 'Designation'
        },
        {
            dataField: 'roles',
            text: 'Roles'
        },
        {
            formatter: (cell, row, index) => {
                return (
                    <Dropdown className={"input-group-text"}>
                        <Dropdown.Toggle id="dropdown-basic">
                            <Filter /> Action
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {/* <DropdownItem onClick={() => {
                                setEditDialogState({
                                    ...editDialogState,
                                    show: true,
                                    index: index,
                                    name: row.name,
                                    email: row.email,
                                    createdAt: row.createdAt,
                                    designation: row.company,
                                })
                            }}>Contact</DropdownItem> */}
                            <DropdownItem onClick={() => {
                                setEditDialogState({
                                    ...editDialogState,
                                    show: true,
                                    index: index,
                                    name: row.name,
                                    email: row.email,
                                    // createdAt: row.createdAt,
                                    designation: row.designation,
                                    roles: row.roles,
                                })
                            }}>Edit</DropdownItem>
                            <DropdownItem onClick={() => {
                                appContext.openDialog(
                                    "Are you sure?",
                                    [
                                        {
                                            title: "Close",
                                            handler: appContext.closeDialog,
                                            variant: "secondary"
                                        },
                                        {
                                            title: "Remove employee",
                                            handler: () => removeEmployee(index),
                                            variant: "danger"
                                        }
                                    ],
                                    "Once deleted, this can't be undone. Are you sure you want to proceed?"
                                )
                            }}>Remove</DropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                )
            },
            text: "Actions",
            headerStyle: () => {
                return { width: "1%" };
            }
        }
    ];

    const handleEditEmployee = () => {
        let errors = []
        if (!editDialogState.name || editDialogState.name.length === 0) {
            errors.push("Employee name cannot be empty")
        }
        if (!editDialogState.email || editDialogState.email.length === 0) {
            errors.push("Employee email cannot be empty")
        }
        // if (!editDialogState.createdAt || editDialogState.createdAt.length === 0) {
        //     errors.push("Employee creation date cannot be empty")
        // }
        if (!editDialogState.designation || editDialogState.designation.length === 0) {
            errors.push("Employee designation cannot be empty")
        }
        if (!editDialogState.roles || editDialogState.roles.length === 0) {
            errors.push("Employee roles cannot be empty")
        }
        if (errors.length > 0) {
            setEditDialogState({
                ...editDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            axios({
                // TEMPORARY FIX:
                // url: `${BASE_URL}/api/v1/companies/177/employees/` + employeePageState.listOfEmployees[editDialogState.index].id,
                url: `${BASE_URL}/api/v1/companies/` + 177 + `/employees/` + employeePageState.listOfEmployees[editDialogState.index].id,
                method: 'patch',
                timeout: 10000,
                data: {
                    name: editDialogState.name,
                    designation: editDialogState.designation,
                    email: editDialogState.email,
                    auth0Id: editDialogState.auth0Id,
                    roles: editDialogState.roles,
                }
            }).then((resp) => {
                if (resp.status === 200) {
                    fetchEmployees()
                }
                else {
                    setPageState({
                        ...employeePageState,
                        listOfEmployees: [],
                        patchEmployeeListRequestStatus: EmployeePageStatus.Error,
                        searchFetchError: 'There was an error updating the list of employees. Please try again later'
                    })
                }
            }).catch((error) => {
                setPageState({
                    ...employeePageState,
                    listOfEmployees: [],
                    patchEmployeeListRequestStatus: EmployeePageStatus.Error,
                    searchFetchError: 'There was an error updating the list of employees. Please try again later'
                })
            })

            setPageState({
                ...employeePageState,
                listOfEmployees: [
                    ...employeePageState.listOfEmployees,
                    {
                        name: editDialogState.name,
                        designation: editDialogState.designation,
                        email: editDialogState.email,
                        createdAt: editDialogState.createdAt,
                        roles: editDialogState.roles,
                    }
                ],
            })
            setEditDialogState({
                ...editDialogState,
                show: false,
            })

            let newEmployees = []
            for (let i = 0; i < employeePageState.listOfEmployees.length; i++) {
                if (i === editDialogState.index) {
                    newEmployees.push({
                        name: editDialogState.name,
                        email: editDialogState.email,
                        createdAt: editDialogState.createdAt,
                        designation: editDialogState.designation,
                        roles: editDialogState.roles
                    })
                }
                else {
                    newEmployees.push(employeePageState.listOfEmployees[i])
                }
            }
            setPageState({
                ...employeePageState,
                listOfEmployees: newEmployees
            })
            setEditDialogState({
                ...editDialogState,
                show: false,
            })
        }
    }

    return (
        <div className={"page-container"}>
            <EmployeeEditDialog
                show={editDialogState.show}
                title={"Edit Employee"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setEditDialogState({
                                ...editDialogState,
                                show: false
                            })
                        },
                        variant: "secondary"
                    },
                    {
                        title: "Save",
                        handler: handleEditEmployee,
                        variant: "primary"
                    }
                ]}
                errors={editDialogState.errors}
                onNameChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        name: e.target.value
                    })
                }}
                onEmailChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        email: e.target.value
                    })
                }}
                // onCreatedAtChange={(e) => {
                //     setEditDialogState({
                //         ...editDialogState,
                //         createdAt: e.target.value
                //     })
                // }}
                onDesignationChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        designation: e.target.value
                    })
                }}
                onRolesChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        roles: e.target.value
                    })
                }}
                name={editDialogState.name}
                email={editDialogState.email}
                // createdAt={editDialogState.createdAt}
                designation={editDialogState.designation}
                roles={editDialogState.roles}
            />

            <EmployeeEditDialog
                show={createDialogState.show}
                title={"Add Employee"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setCreateDialogState({
                                ...createDialogState,
                                show: false
                            })
                        },
                        variant: "secondary"
                    },
                    {
                        title: "Create",
                        handler: createEmployee,
                        variant: "primary"
                    }
                ]}
                errors={createDialogState.errors}
                onNameChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        name: e.target.value
                    })
                }}
                onEmailChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        email: e.target.value
                    })
                }}
                // onCreatedAtChange={(e) => {
                //     setCreateDialogState({
                //         ...createDialogState,
                //         createdAt: e.target.value
                //     })
                // }}
                onDesignationChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        designation: e.target.value
                    })
                }}
                onRolesChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        roles: e.target.value
                    })
                }}
                name={createDialogState.name}
                email={createDialogState.email}
                // createdAt={createDialogState.createdAt}
                designation={createDialogState.designation}
                roles={createDialogState.roles}
            />
            <div>
                <ToolkitProvider
                    keyField="id"
                    data={employeePageState.listOfEmployees}
                    columns={columns}
                    search
                >
                    {
                        props => (
                            <div className={"employees-container"}>
                                <Breadcrumb>
                                    <Breadcrumb.Item href="/dashboard/home">Dashboard</Breadcrumb.Item>
                                    <Breadcrumb.Item active>People: Employees</Breadcrumb.Item>
                                </Breadcrumb>
                                <h1>Manage Employees</h1>

                                <div className={"container-vcenter-hright"}>

                                    <SearchBar {...props.searchProps} />

                                    <Button variant="primary"
                                        onClick={() => {
                                            setCreateDialogState({
                                                ...createDialogState,
                                                show: true
                                            })
                                        }}
                                    >Add Employee</Button>
                                </div>
                                {/* <hr /> */}
                                <BootstrapTable
                                    {...props.baseProps}
                                    striped
                                    condensed
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        </div>
    )
}