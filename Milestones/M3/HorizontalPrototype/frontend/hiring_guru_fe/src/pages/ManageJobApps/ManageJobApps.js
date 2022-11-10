import './ManageJobApps.css';
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

const JobApps = [
    {
        title: "Farhan Haider",
        job: "Software Engineer",
        role: "Team Lead",
        company: "Binary Brains",
        timestamp: "11/10/2022 at 9:00 AM"
    },
    {
        title: "Kenny Leong",
        job: "Software Engineer",
        role: "Frontend Engineer",
        company: "Binary Brains",
        timestamp: "11/10/2022 at 9:00 AM"
    },
    {
        title: "Mamadou Bah",
        job: "Software Engineer",
        role: "Frontend Engineer",
        company: "Binary Brains",
        timestamp: "11/10/2022 at 9:00 AM"
    },
    {
        title: "Khushi Khanna",
        job: "Software Engineer",
        role: "Backend Engineer",
        company: "Binary Brains",
        timestamp: "11/10/2022 at 9:00 AM"
    }
]

function JobAppsEditDialog(props) {
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
                        Candidate Name
                    </label>
                    <input className="form-control" id="recruitmentStageNameInput"
                        placeholder="First name Last name"
                        value={props.name}
                        onChange={props.onNameChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Prospective Job Title
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
                        Prospective Role
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
                        Prospective Company
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="Enter company name"
                        value={props.company}
                        onChange={props.onCompanyChange}
                    >
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Date and Time Submitted
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="MM/DD/YEAR at 0:00 AM"
                        value={props.timestamp}
                        onChange={props.onTimestampChange}
                    >
                    </input>
                </div>
            </div>
        </Dialog>
    )
}


export function ManageJobApps() {
    const { SearchBar } = Search;
    const [roles, setJobApps] = useState(JobApps)
    const [editDialogState, setEditDialogState] = useState({
        show: false,
        title: "",
        job: "",
        role: "",
        company: "",
        timestamp:"",
        errors: [],
        index: undefined
    })

    const [createDialogState, setCreateDialogState] = useState({
        show: false,
        title: "",
        job: "",
        role: "",
        company: "",
        timestamp:"",
        errors: [],
        index: undefined
    })

    const appContext = useContext(ApplicationContext);

    const removeJobApp = (index) => {
        let newJobApps = []
        for (let i = 0; i < roles.length; i++) {
            i !== index && newJobApps.push(roles[i])
        }
        appContext.closeDialog()
        setJobApps(newJobApps)
    }

    const createEmployee = () => {
        let errors = []
        if (!createDialogState.title || createDialogState.title.length === 0) {
            errors.push("Candidate name cannot be empty")
        }
        if (!createDialogState.job || createDialogState.job.length === 0) {
            errors.push("Prospective job title cannot be empty")
        }
        if (!createDialogState.role || createDialogState.role.length === 0) {
            errors.push("Prospective job role cannot be empty")
        }
        if (!createDialogState.company || createDialogState.company.length === 0) {
            errors.push("Prospective company cannot be empty")
        }
        if (!createDialogState.timestamp || createDialogState.timestamp.length === 0) {
            errors.push("Submission timestamp cannot be empty")
        }
        if (errors.length > 0) {
            setCreateDialogState({
                ...createDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            setJobApps([
                ...roles,
                {
                    title: createDialogState.title,
                    company: createDialogState.company,
                    job: createDialogState.job,
                    role: createDialogState.role,
                    timestamp: createDialogState.timestamp,
                }
            ])
            setCreateDialogState({
                ...createDialogState,
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
            dataField: 'job',
            text: 'Job Title'
        },
        {
            dataField: 'role',
            text: 'Role'
        },
        {
            dataField: 'company',
            text: 'Company'
        },
        {
            dataField: 'timestamp',
            text: 'Timestamp'
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
                                    timestamp:row.timestamp,
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
                                            title: "Remove job application",
                                            handler: () => removeJobApp(index),
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

    const handleEditJobApp = () => {
        let errors = []
        if (!editDialogState.title || editDialogState.title.length === 0) {
            errors.push("Candidate name cannot be empty")
        }
        if (!editDialogState.job || editDialogState.job.length === 0) {
            errors.push("Prospective job title cannot be empty")
        }
        if (!editDialogState.role || editDialogState.role.length === 0) {
            errors.push("Prospective job role cannot be empty")
        }
        if (!editDialogState.company || editDialogState.company.length === 0) {
            errors.push("Prospective company cannot be empty")
        }
        if (!editDialogState.timestamp || editDialogState.timestamp.length === 0) {
            errors.push("Submission timestamp cannot be empty")
        }
        if (errors.length > 0) {
            setEditDialogState({
                ...editDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            let newJobApps = []
            for (let i = 0; i < roles.length; i++) {
                if (i === editDialogState.index) {
                    newJobApps.push({
                        title: editDialogState.title,
                        job: editDialogState.job,
                        role: editDialogState.role,
                        company: editDialogState.company,
                        timestamp: editDialogState.timestamp
                    })
                }
                else {
                    newJobApps.push(roles[i])
                }
            }
            setJobApps(newJobApps)
            setEditDialogState({
                ...editDialogState,
                show: false,
            })
        }
    }

    return (
        <div className={"page-container"}>
            <JobAppsEditDialog
                show={editDialogState.show}
                title={"Edit Submission"}
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
                        handler: handleEditJobApp,
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
                onTimestampChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        timestamp: e.target.value
                    })
                }}
                name={editDialogState.title}
                job={editDialogState.job}
                role={editDialogState.role}
                company={editDialogState.company}
                timestamp={editDialogState.timestamp}
            />
            <JobAppsEditDialog
                show={createDialogState.show}
                title={"Add Submission"}
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
                onTimestampChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        timestamp: e.target.value
                    })
                }}
                name={createDialogState.title}
                role={createDialogState.role}
                company={createDialogState.company}
                timestamp={createDialogState.timestamp}
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
                                    <Breadcrumb.Item active>Recruitment: Job Apps</Breadcrumb.Item>
                                </Breadcrumb>
                                <h1>Manage Job Apps</h1>

                                <div className={"container-vcenter-hright"}>

                                    <SearchBar {...props.searchProps} />

                                    <Button variant="primary"
                                        onClick={() => {
                                            setCreateDialogState({
                                                ...createDialogState,
                                                show: true
                                            })
                                        }}
                                    >Add Submission</Button>
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