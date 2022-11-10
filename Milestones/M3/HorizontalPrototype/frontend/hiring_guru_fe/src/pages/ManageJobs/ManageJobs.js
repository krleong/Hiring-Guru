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
    },
]

function JobEditDialog(props) {
    return (
        <Dialog
            show={props.show}
            title={props.title}
            actions={props.actions}
        >
            <div>
                <div className={"job-step-errors"}>
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
                    <label htmlFor="jobStageTitleInput" className="form-label">
                        Job Title
                    </label>
                    <input className="form-control" id="jobStageTitleInput"
                        placeholder="Enter title"
                        value={props.jobTitle}
                        onChange={props.onTitleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="jobStageWorkplaceInput" className="form-label">
                        Workplace Type
                    </label>
                    <input className="form-control" id="jobStageWorkplaceInput"
                        placeholder="On-site, Remote, Hybrid"
                        value={props.jobWorkplace}
                        onChange={props.onWorkplaceChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="jobStageEmploymentInput" className="form-label">
                        Employment Type
                    </label>
                    <input className="form-control" id="jobStageEmploymentInput"
                        placeholder="Full-Time, Part-Time, Internship"
                        value={props.jobEmployment}
                        onChange={props.onEmploymentChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="jobLocationInput" className="form-label">
                        Job Location
                    </label>
                    <input className="form-control" id="jobLocationInput"
                        placeholder="San Francisco, CA"
                        value={props.Location}
                        onChange={props.onLocationChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="jobStageDescriptionInput" className="form-label">
                        Description
                    </label>
                    <textarea className="form-control" id="jobStageDescriptionInput"
                        rows="5" placeholder="Enter description ..."
                        value={props.stepDescription}
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
        workplace: "",
        employment: "",
        location: "",
        description: "",
        errors: [],
        index: undefined
    })

    const [createJobDialogState, setCreateJobDialogState] = useState({
        show: false,
        title: "",
        workplace: "",
        employment: "",
        location: "",
        description: "",
        errors: [],
        index: undefined
    })

    const appContext = useContext(ApplicationContext);

    const removeJob = (index) => {
        let newJobs = []
        for (let i = 0; i < roles.length; i++) {
            i !== index && newJobs.push(roles[i])
        }
        appContext.closeDialog()
        setJobs(newJobs)
    }

    const createJob = () => {
        let errors = []
        if (!createJobDialogState.title || createJobDialogState.title.length === 0) {
            errors.push("Job title cannot be empty")
        }
        if (!createJobDialogState.workplace || createJobDialogState.workplace.length === 0) {
            errors.push("Job workplace cannot be empty")
        }
        if (!createJobDialogState.employment || createJobDialogState.employment.length === 0) {
            errors.push("Job employment cannot be empty")
        }
        if (!createJobDialogState.location || createJobDialogState.location.length === 0) {
            errors.push("Job location cannot be empty")
        }
        if (!createJobDialogState.description || createJobDialogState.description.length === 0) {
            errors.push("Job description cannot be empty")
        }
        if (errors.length > 0) {
            setCreateJobDialogState({
                ...createJobDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            setJobs([
                ...roles,
                {
                    title: createJobDialogState.title,
                    workplace: createJobDialogState.workplace,
                    employment: createJobDialogState.employment,
                    location: createJobDialogState.location,
                    description: createJobDialogState.description,
                }
            ])
            setCreateJobDialogState({
                ...createJobDialogState,
                show: false,
            })
        }
    }

    const columns = [
        {
            dataField: 'title',
            text: 'Title'
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
                            <DropdownItem onClick={() => {
                                setEditDialogState({
                                    ...editDialogState,
                                    show: true,
                                    index: index,
                                    title: row.title,
                                    workplace: row.workplace,
                                    employment: row.employment,
                                    location: row.location,
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
                                            title: "Remove job",
                                            handler: () => removeJob(index),
                                            variant: "primary"
                                        }
                                    ],
                                    "Once deleted, this can't be undone. Are you sure you want to proceed?"
                                )
                            }}>Delete</DropdownItem>
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
            errors.push("Job workplace cannot be empty")
        }
        if (!editDialogState.employment || editDialogState.employment.length === 0) {
            errors.push("Job employment cannot be empty")
        }
        if (!editDialogState.location || editDialogState.location.length === 0) {
            errors.push("Job location cannot be empty")
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
                        workplace: editDialogState.workplace,
                        employment: editDialogState.employment,
                        location: editDialogState.location,
                        description: editDialogState.description,
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

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true
    };

    return (
        <div className={"page-container"}>
            <JobEditDialog
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
                onTitleChange={(e) => {
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
                jobTitle={editDialogState.title}
                workplace={editDialogState.workplace}
                employment={editDialogState.employment}
                location={editDialogState.location}
            />
            <JobEditDialog
                show={createJobDialogState.show}
                title={"Create Job"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setCreateJobDialogState({
                                ...createJobDialogState,
                                show: false
                            })
                        },
                        variant: "secondary"
                    },
                    {
                        title: "Create",
                        handler: createJob,
                        variant: "primary"
                    }
                ]}
                errors={createJobDialogState.errors}
                onTitleChange={(e) => {
                    setCreateJobDialogState({
                        ...createJobDialogState,
                        title: e.target.value
                    })
                }}
                onExpectationsChange={(e) => {
                    setCreateJobDialogState({
                        ...createJobDialogState,
                        expectations: e.target.value
                    })
                }}
                onBenefitsChange={(e) => {
                    setCreateJobDialogState({
                        ...createJobDialogState,
                        benefits: e.target.value
                    })
                }}
                jobTitle={createJobDialogState.title}
                workplace={createJobDialogState.workplace}
                employment={createJobDialogState.employment}
                location={createJobDialogState.location}
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
                            <div className={"job-roles-container"}>
                                <Breadcrumb>
                                    <Breadcrumb.Item href="/dashboard/home">Dashboard</Breadcrumb.Item>
                                    <Breadcrumb.Item active>Recruitment: Jobs</Breadcrumb.Item>
                                </Breadcrumb>
                                <h1>Manage Jobs</h1>

                                <div className={"container-vcenter-hright"}>

                                    <SearchBar {...props.searchProps} />

                                    <Button variant="primary"
                                        onClick={() => {
                                            setCreateJobDialogState({
                                                ...createJobDialogState,
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