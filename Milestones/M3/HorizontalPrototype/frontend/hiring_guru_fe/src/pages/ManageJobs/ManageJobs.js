import './ManageJobs.css';
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

const Jobs = [
    {
        title: "Software Engineer",
        location: "San Francisco",
        employment: "Full-Time",
        workplace: "On-site",
        description: "An IT professional who designs, develops and maintains computer software at a company. They " +
            "use their creativity and technical skills and apply the principles of software engineering to help " +
            "solve new and ongoing problems for an organization."
    },
    {
        title: "Product Manager",
        location: "New York",
        employment: "Part-Time",
        workplace: "Remote",
        description: "A professional who combines both product planning and marketing to manage" +
            "the entire life cycle of one project. They're responsible for gathering customer" +
            "requirements and defining their vision with engineering as well as overseeing product" +
            "strategy, pricing and positioning strategies."
    },
    {
        title: "Data Analyst",
        location: "San Francisco",
        employment: "Internship",
        workplace: "On-site",
        description: "Data analysts are responsible for analyzing data using statistical techniques, " +
            "implementing and maintaining databases, gathering data from primary and secondary sources, " +
            "identifying, analyzing and interpreting trends from the data."
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
                                <div key={`create-rect-step-error-${index}`} className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageNameInput" className="form-label">
                        Job Title
                    </label>
                    <input className="form-control" id="recruitmentStageNameInput"
                        placeholder="Enter job title"
                        value={props.name}
                        onChange={props.onNameChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageNameInput" className="form-label">
                        Workplace
                    </label>
                    <input className="form-control" id="recruitmentStageNameInput"
                        placeholder="San Francisco, CA"
                        value={props.workplace}
                        onChange={props.onWorkplaceChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageNameInput" className="form-label">
                        Employment Type
                    </label>
                    <input className="form-control" id="recruitmentStageNameInput"
                        placeholder="Full-Time, Part-Time, Internship"
                        value={props.employment}
                        onChange={props.onEmploymentChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageNameInput" className="form-label">
                        Location
                    </label>
                    <input className="form-control" id="recruitmentStageNameInput"
                        placeholder="San Francisco, CA"
                        value={props.location}
                        onChange={props.onLocationChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Description
                    </label>
                    <textarea className="form-control" id="recruitmentStageDescriptionInput"
                        rows="5" placeholder="Enter description"
                        value={props.description}
                        onChange={props.onDescriptionChange}
                    >
                    </textarea>
                </div>
            </div>
        </Dialog>
    )
}


export function ManageJobs() {
    const { SearchBar } = Search;
    const [roles, setJobs] = useState(Jobs)
    const [editDialogState, setEditDialogState] = useState({
        show: false,
        title: "",
        location: "",
        employment: "",
        workplace: "",
        description: "",
        errors: [],
        index: undefined
    })

    const [createDialogState, setCreateDialogState] = useState({
        show: false,
        title: "",
        location: "",
        employment: "",
        workplace: "",
        description: "",
        errors: [],
        index: undefined
    })

    const appContext = useContext(ApplicationContext);

    const removeEmployee = (index) => {
        let newJobs = []
        for (let i = 0; i < roles.length; i++) {
            i !== index && newJobs.push(roles[i])
        }
        appContext.closeDialog()
        setJobs(newJobs)
    }

    const createEmployee = () => {
        let errors = []
        if (!createDialogState.title || createDialogState.title.length === 0) {
            errors.push("Job title cannot be empty")
        }
        if (!createDialogState.workplace || createDialogState.workplace.length === 0) {
            errors.push("Workplace type cannot be empty")
        }
        if (!createDialogState.employment || createDialogState.employment.length === 0) {
            errors.push("Employment type cannot be empty")
        }
        if (!createDialogState.location || createDialogState.location.length === 0) {
            errors.push("Location title cannot be empty")
        }

        if (!createDialogState.description || createDialogState.description.length === 0) {
            errors.push("Job description cannot be empty")
        }
        if (errors.length > 0) {
            setCreateDialogState({
                ...createDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            setJobs([
                ...roles,
                {
                    title: createDialogState.title,
                    location: createDialogState.location,
                    employment: createDialogState.employment,
                    workplace: createDialogState.workplace,
                    description: createDialogState.description,
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
            dataField: 'workplace',
            text: 'Workplace'
        },
        {
            dataField: 'employment',
            text: 'Employment'
        },
        {
            dataField: 'location',
            text: 'Location'
        },
        {
            dataField: 'description',
            text: 'Description'
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
                                    location: row.location,
                                    employment: row.employment,
                                    workplace: row.workplace,
                                    description: row.description,
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

    const handleEditJob = () => {
        let errors = []
        if (!editDialogState.title || editDialogState.title.length === 0) {
            errors.push("Job title cannot be empty")
        }
        if (!editDialogState.workplace || editDialogState.workplace.length === 0) {
            errors.push("Workplace type cannot be empty")
        }
        if (!editDialogState.employment || editDialogState.employment.length === 0) {
            errors.push("Employment type cannot be empty")
        }
        if (!editDialogState.location || editDialogState.location.length === 0) {
            errors.push("Location title cannot be empty")
        }

        if (!editDialogState.description || editDialogState.description.length === 0) {
            errors.push("Job description cannot be empty")
        }
        if (errors.length > 0) {
            setEditDialogState({
                ...editDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            let newJobs = []
            for (let i = 0; i < roles.length; i++) {
                if (i === editDialogState.index) {
                    newJobs.push({
                        title: editDialogState.title,
                        location: editDialogState.location,
                        employment: editDialogState.employment,
                        workplace: editDialogState.workplace,
                        description: editDialogState.description
                    })
                }
                else {
                    newJobs.push(roles[i])
                }
            }
            setJobs(newJobs)
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
                title={"Edit Job"}
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
                        handler: handleEditJob,
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
                onWorkplaceChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        workplace: e.target.value
                    })
                }}
                onEmploymentChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        employment: e.target.value
                    })
                }}
                onLocationChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        location: e.target.value
                    })
                }}
                onDescriptionChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        description: e.target.value
                    })
                }}
                name={editDialogState.title}
                workplace={editDialogState.workplace}
                employment={editDialogState.employment}
                location={editDialogState.location}
                description={editDialogState.description}
            />
            <EmployeeEditDialog
                show={createDialogState.show}
                title={"Create Job"}
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
                onWorkplaceChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        workplace: e.target.value
                    })
                }}
                onEmploymentChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        employment: e.target.value
                    })
                }}
                onLocationChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        location: e.target.value
                    })
                }}
                onDescriptionChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        description: e.target.value
                    })
                }}
                name={createDialogState.title}
                workplace={createDialogState.workplace}
                employment={createDialogState.employment}
                location={createDialogState.location}
                description={createDialogState.description}
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
                                    <Breadcrumb.Item active>Recruitment: Jobs</Breadcrumb.Item>
                                </Breadcrumb>
                                <h1>Manage Jobs</h1>

                                <div className={"container-vcenter-hright"}>

                                    <SearchBar {...props.searchProps} />

                                    <Button variant="primary"
                                        onClick={() => {
                                            setCreateDialogState({
                                                ...createDialogState,
                                                show: true
                                            })
                                        }}
                                    >Create Job</Button>
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