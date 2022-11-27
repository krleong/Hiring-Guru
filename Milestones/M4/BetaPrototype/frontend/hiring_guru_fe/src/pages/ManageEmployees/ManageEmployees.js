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
                        Job Title
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="Enter job title"
                        value={props.job}
                        onChange={props.onJobChange}
                    >
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Role
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="Enter role"
                        value={props.role}
                        onChange={props.onRoleChange}
                    >
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Company
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="Enter company name"
                        value={props.company}
                        onChange={props.onCompanyChange}
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
    for(let i=0; i<employees.length; i++) {
        parsedEmployees.push({
            name: employees[i].user.name,
            email: employees[i].user.email,
            createdAt: employees[i].createdAt,
            designation: employees[i].designation,
            roles: employees[i].roles
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

        setPageState({
            ...employeePageState,
            listOfEmployees: [],
            getEmployeeListRequestStatus: EmployeePageStatus.InProgress,
            searchFetchError: ''
        })
        axios({
            url: `${BASE_URL}/api/v1/companies/177/employees`,
            method: 'get',
            timeout: 10000,
            params: {
                query: employeePageState.searchString,
            }
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
    }, []);

    const [editDialogState, setEditDialogState] = useState({
        show: false,
        title: "",
        job: "",
        role: "",
        company: "",
        errors: [],
        index: undefined
    })

    const [createDialogState, setCreateDialogState] = useState({
        show: false,
        title: "",
        job: "",
        role: "",
        company: "",
        errors: [],
        index: undefined
    })

    const appContext = useContext(ApplicationContext);

    const removeEmployee = (index) => {
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
        if (!createDialogState.title || createDialogState.title.length === 0) {
            errors.push("Employee title cannot be empty")
        }
        if (!createDialogState.job || createDialogState.job.length === 0) {
            errors.push("Employee job title cannot be empty")
        }
        if (!createDialogState.role || createDialogState.role.length === 0) {
            errors.push("Employee role cannot be empty")
        }
        if (!createDialogState.company || createDialogState.company.length === 0) {
            errors.push("Employee company cannot be empty")
        }
        if (errors.length > 0) {
            setCreateDialogState({
                ...createDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            setPageState({
                ...employeePageState,
                listOfEmployees: [
                    ...employeePageState.listOfEmployees,
                    {
                        title: createDialogState.title,
                        company: createDialogState.company,
                        job: createDialogState.job,
                        role: createDialogState.role,
                    }
                ]
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
                                    title: row.title,
                                    job: row.job,
                                    role: row.role,
                                    company: row.company,
                                })
                            }}>Contact</DropdownItem> */}
                            <DropdownItem onClick={() => {
                                setEditDialogState({
                                    ...editDialogState,
                                    show: true,
                                    index: index,
                                    title: row.title,
                                    job: row.job,
                                    role: row.role,
                                    company: row.company,
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
        if (!editDialogState.title || editDialogState.title.length === 0) {
            errors.push("Employee name cannot be empty")
        }
        if (!editDialogState.job || editDialogState.job.length === 0) {
            errors.push("Employee job title cannot be empty")
        }
        if (!editDialogState.role || editDialogState.role.length === 0) {
            errors.push("Employee role cannot be empty")
        }
        if (!editDialogState.company || editDialogState.company.length === 0) {
            errors.push("Employee company cannot be empty")
        }
        if (errors.length > 0) {
            setEditDialogState({
                ...editDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            let newEmployees = []
            for (let i = 0; i < employeePageState.listOfEmployees.length; i++) {
                if (i === editDialogState.index) {
                    newEmployees.push({
                        title: editDialogState.title,
                        job: editDialogState.job,
                        role: editDialogState.role,
                        company: editDialogState.company
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
                        title: e.target.value
                    })
                }}
                onJobChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        job: e.target.value
                    })
                }}
                onRoleChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        role: e.target.value
                    })
                }}
                onCompanyChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        company: e.target.value
                    })
                }}
                name={editDialogState.title}
                job={editDialogState.job}
                role={editDialogState.role}
                company={editDialogState.company}
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
                        title: e.target.value
                    })
                }}
                onJobChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        job: e.target.value
                    })
                }}
                onRoleChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        role: e.target.value
                    })
                }}
                onCompanyChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        company: e.target.value
                    })
                }}
                name={createDialogState.title}
                role={createDialogState.role}
                company={createDialogState.company}
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
                                    <Breadcrumb.Item active>Recruitment: Employees</Breadcrumb.Item>
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