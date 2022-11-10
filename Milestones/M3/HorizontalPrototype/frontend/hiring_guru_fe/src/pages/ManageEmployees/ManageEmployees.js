import './ManageEmployees.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import React, { useContext, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Filter } from "react-bootstrap-icons";
import DropdownItem from "react-bootstrap/DropdownItem";
import { Dialog } from "../../components/Dialog/Dialog";
import { ApplicationContext } from "../../HiringGuru";
import Button from "react-bootstrap/Button";

const Employees = [
    {
        title: "Farhan Haider",
        position: "Team Lead",
        company: "Binary Brains"
    },
    {
        title: "Kenny Leong",
        position: "Frontend Engineer",
        company: "Binary Brains"
    },
    {
        title: "Mamadou Bah",
        position: "Frontend Engineer",
        company: "Binary Brains"
    },
    {
        title: "Khushi Khanna",
        position: "Backend Engineer",
        company: "Binary Brains"
    }
]

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
                                <div key={`create-rect-step-error-${index}`} className="alert alert-danger" position="alert">
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
                        value={props.roleName}
                        onChange={props.onNameChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Company
                    </label>
                    <textarea className="form-control" id="recruitmentStageDescriptionInput"
                        rows="5" placeholder="Enter description ..."
                        value={props.company}
                        onChange={props.onCompanyChange}
                    >
                    </textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Position
                    </label>
                    <textarea className="form-control" id="recruitmentStageDescriptionInput"
                        rows="5" placeholder="Enter description ..."
                        value={props.position}
                        onChange={props.onPositionChange}
                    >
                    </textarea>
                </div>
            </div>
        </Dialog>
    )
}


export function ManageEmployees() {
    const { SearchBar } = Search;
    const [roles, setEmployees] = useState(Employees)
    const [editDialogState, setEditDialogState] = useState({
        show: false,
        title: "",
        company: "",
        position: "",
        errors: [],
        index: undefined
    })

    const [createEmployeeDialogState, setCreateEmployeeDialogState] = useState({
        show: false,
        title: "",
        company: "",
        position: "",
        errors: [],
        index: undefined
    })

    const appContext = useContext(ApplicationContext);

    const removeEmployee = (index) => {
        let newEmployees = []
        for (let i = 0; i < roles.length; i++) {
            i !== index && newEmployees.push(roles[i])
        }
        appContext.closeDialog()
        setEmployees(newEmployees)
    }

    const createEmployee = () => {
        let errors = []
        if (!createEmployeeDialogState.title || createEmployeeDialogState.title.length === 0) {
            errors.push("Employee title cannot be empty")
        }
        if (!createEmployeeDialogState.position || createEmployeeDialogState.position.length === 0) {
            errors.push("Employee position cannot be empty")
        }
        if (!createEmployeeDialogState.company || createEmployeeDialogState.company.length === 0) {
            errors.push("Employee company cannot be empty")
        }
        if (errors.length > 0) {
            setCreateEmployeeDialogState({
                ...createEmployeeDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            setEmployees([
                ...roles,
                {
                    position: createEmployeeDialogState.position,
                    title: createEmployeeDialogState.title,
                    company: createEmployeeDialogState.company
                }
            ])
            setCreateEmployeeDialogState({
                ...createEmployeeDialogState,
                show: false,
            })
        }
    }

    const columns = [
        {
            dataField: 'title',
            text: 'Name'
        },
        {
            dataField: 'position',
            text: 'Position'
        },
        {
            dataField: 'company',
            text: 'Company'
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
                                    company: row.company,
                                    position: row.position,
                                })
                            }}>Contact</DropdownItem> */}
                            <DropdownItem onClick={() => {
                                setEditDialogState({
                                    ...editDialogState,
                                    show: true,
                                    index: index,
                                    title: row.title,
                                    company: row.company,
                                    position: row.position,
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
                                            title: "Remove role",
                                            handler: () => removeEmployee(index),
                                            variant: "primary"
                                        }
                                    ],
                                    "Once deleted, this can't be undone. Are you sure you want to proceed?"
                                )
                            }}>Remove</DropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                )
            },
            text: "Actions"
        }
    ];

    const handleEditRecruitmentStep = () => {
        let errors = []
        if (!editDialogState.title || editDialogState.title.length === 0) {
            errors.push("Employee title cannot be empty")
        }
        if (!editDialogState.position || editDialogState.position.length === 0) {
            errors.push("Employee position cannot be empty")
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
            for (let i = 0; i < roles.length; i++) {
                if (i === editDialogState.index) {
                    newEmployees.push({
                        position: editDialogState.position,
                        title: editDialogState.title,
                        company: editDialogState.company
                    })
                }
                else {
                    newEmployees.push(roles[i])
                }
            }
            setEmployees(newEmployees)
            setEditDialogState({
                ...editDialogState,
                show: false,
            })
        }
    }

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true
    };

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
                        handler: handleEditRecruitmentStep,
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
                onPositionChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        position: e.target.value
                    })
                }}
                onCompanyChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        company: e.target.value
                    })
                }}
                roleName={editDialogState.title}
                position={editDialogState.position}
                company={editDialogState.company}
            />
            <EmployeeEditDialog
                show={createEmployeeDialogState.show}
                title={"Add Employee"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setCreateEmployeeDialogState({
                                ...createEmployeeDialogState,
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
                errors={createEmployeeDialogState.errors}
                onNameChange={(e) => {
                    setCreateEmployeeDialogState({
                        ...createEmployeeDialogState,
                        title: e.target.value
                    })
                }}
                onPositionChange={(e) => {
                    setCreateEmployeeDialogState({
                        ...createEmployeeDialogState,
                        position: e.target.value
                    })
                }}
                onCompanyChange={(e) => {
                    setCreateEmployeeDialogState({
                        ...createEmployeeDialogState,
                        company: e.target.value
                    })
                }}
                roleName={createEmployeeDialogState.title}
                position={createEmployeeDialogState.position}
                company={createEmployeeDialogState.company}
            />
            <div>
                <ToolkitProvider
                    keyField="id"
                    data={roles}
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
                                            setCreateEmployeeDialogState({
                                                ...createEmployeeDialogState,
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