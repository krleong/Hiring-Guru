import './ManageJobs.css';
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


function JobEditDialog(props) {
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
                        onChange={props.onTitleChange}
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
                {/* <div className="mb-3">
                    <label htmlFor="recruitmentStageNameInput" className="form-label">
                        Employment Type
                    </label>
                    <input className="form-control" id="recruitmentStageNameInput"
                        placeholder="FULL_TIME / PART_TIME"
                        value={props.type}
                        onChange={props.onTypeChange}
                    />
                </div> */}

                {/* <div className="mb-3">
                    <label htmlFor="recruitmentStageNameInput" className="form-label">
                        Employment Type
                    </label> */}


                {/* TODO: Implement dropdown menu for employment type*/}
                {/* <div className={"position-selection-dropdown"}>
                    <div className="input-group input-group-sm">
                        <Dropdown className={"input-group-text"}>
                            <Dropdown.Menu>
                                {
                                    Object.keys(JobType).map((jobType) => {
                                        const jobTypeValue = JobType[jobType]
                                        return (
                                            <Dropdown.Item key={jobTypeValue.ui} onClick={(e) => {
                                                setPageState({
                                                    ...jobPageState,
                                                    selectedJobType: jobTypeValue
                                                })
                                            }} active={jobPageState.selectedJobType === jobTypeValue ? true : false}>
                                                {jobTypeValue.ui}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div> */}
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                        value={props.onTypeChange}>                            Select
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" value={"FULL_TIME"} onClick={props.onTypeChange}>Full-Time</a></li>
                        <li><a className="dropdown-item" value={"PART_TIME"} onClick={props.onTypeChange}>Part-Time</a></li>
                    </ul>
                </div>
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
        </Dialog >
    )
}

const JobsPageStatus = {
    NotStarted: "NotStarted",
    InProgress: "InProgress",
    Error: "Error",
    Success: "Success",
}

const RolesFetchStatus = {
    NotStarted: "NotStarted",
    InProgress: "InProgress",
    Error: "Error",
    Success: "Success",
}

const JobType = {
    All: {
        ui: 'All',
        server: 'ALL'
    },
    FullTime: {
        ui: 'Full Time',
        server: 'FULL_TIME'
    },
    PartTime: {
        ui: 'Part Time',
        server: 'PART_TIME'
    },
}

const parseJobs = (jobs) => {
    let parsedJobs = []
    for (let i = 0; i < jobs.length; i++) {
        parsedJobs.push({
            jobId: jobs[i].id,
            roleId: jobs[i].role.id,
            title: jobs[i].title,
            location: jobs[i].location,
            type: jobs[i].type,
            description: jobs[i].description,
        })
    }
    return parsedJobs
}


export function ManageJobs() {
    const appContext = useContext(ApplicationContext);

    const [jobPageState, setPageState] = useState({
        listOfJobs: [],
        listOfRoles: [],
        selectedRoleId: undefined,
        getRolesListRequestStatus: RolesFetchStatus.NotStarted,
        rolesFetchError: '',
        searchString: '',
        getJobListRequestStatus: JobsPageStatus.NotStarted,
        searchFetchError: '',
    })

    const { SearchBar } = Search;

    useEffect(() => {
        if (jobPageState.selectedRoleId) {
            fetchJobs(jobPageState.selectedRoleId)
        } else {
            fetchRoles()
        }
    }, [jobPageState.selectedRoleId]);

    const [createDialogState, setCreateDialogState] = useState({
        show: false,
        title: "",
        location: "",
        type: "",
        description: "",
        errors: [],
        index: undefined
    })

    const [editDialogState, setEditDialogState] = useState({
        show: false,
        title: "",
        location: "",
        type: "",
        description: "",
        errors: [],
        index: undefined
    })

    const fetchJobs = (roleId) => {
        console.log("Fetching jobs")
        setPageState({
            ...jobPageState,
            listOfJobs: [],
            getJobListRequestStatus: JobsPageStatus.InProgress,
            searchFetchError: ''
        })

        axios({
            url: `${BASE_URL}/roles/${roleId}/jobs`,
            method: 'get',
            timeout: 10000,
        }).then((resp) => {
            if (resp.status === 200) {
                setPageState({
                    ...jobPageState,
                    listOfJobs: parseJobs(resp.data),
                    getJobListRequestStatus: JobsPageStatus.Success,
                })
            }
            else {
                setPageState({
                    ...jobPageState,
                    listOfJobs: [],
                    getJobListRequestStatus: JobsPageStatus.Error,
                    searchFetchError: 'There was an error fetching the list of jobs. Please try again later'
                })
            }
        }).catch((error) => {
            setPageState({
                ...jobPageState,
                listOfJobs: [],
                getJobListRequestStatus: JobsPageStatus.Error,
                searchFetchError: 'There was an error fetching the list of jobs. Please try again later'
            })
        })
    }

    const fetchRoles = () => {
        setPageState({
            ...jobPageState,
            listOfRoles: [],
            getRolesListRequestStatus: RolesFetchStatus.InProgress,
            rolesFetchError: ''
        })

        axios({
            url: `${BASE_URL}/companies/177/roles`,
            method: 'get',
            timeout: 10000
        }).then((resp) => {
            if (resp.status === 200) {
                setPageState({
                    ...jobPageState,
                    listOfRoles: resp.data,
                    getRolesListRequestStatus: RolesFetchStatus.Success,
                })
            }
            else {
                setPageState({
                    ...jobPageState,
                    listOfRoles: [],
                    getRolesListRequestStatus: RolesFetchStatus.Error,
                    rolesFetchError: 'There was an error fetching the list of roles. Please try again.'
                })
            }
        }).catch((error) => {
            setPageState({
                ...jobPageState,
                listOfRoles: [],
                getRolesListRequestStatus: RolesFetchStatus.Error,
                rolesFetchError: 'There was an error fetching the list of roles. Please try again later'
            })
        })
    }

    const removeJob = (index) => {
        axios({
            url: `${BASE_URL}/roles/` + jobPageState.listOfJobs[index].roleId + '/jobs/' + jobPageState.listOfJobs[index].jobId,
            method: 'delete',
            timeout: 10000,
        }).then((resp) => {
            if (resp.status === 200) {
                fetchJobs(jobPageState.selectedRoleId)
            }
            else {
                setPageState({
                    ...jobPageState,
                    listOfJobs: [],
                    deleteJobListRequestStatus: JobsPageStatus.Error,
                    searchFetchError: 'There was an error deleting the job. Please try again later'
                })
            }
        }).catch((error) => {
            setPageState({
                ...jobPageState,
                listOfJobs: [],
                deleteJobListRequestStatus: JobsPageStatus.Error,
                searchFetchError: 'There was an error deleting the job. Please try again later'
            })
        })

        let newJobs = []
        for (let i = 0; i < jobPageState.listOfJobs.length; i++) {
            i !== index && newJobs.push(jobPageState.listOfJobs[i])
        }
        appContext.closeDialog()
        setPageState({
            ...jobPageState,
            listOfJobs: newJobs
        })
    }

    const createJob = () => {
        let errors = []
        if (!createDialogState.title || createDialogState.title.length === 0) {
            errors.push("Job title cannot be empty")
        }
        if (!createDialogState.location || createDialogState.location.length === 0) {
            errors.push("Location name cannot be empty")
        }
        if (!createDialogState.type || createDialogState.type.valueOf == "Select") {
            errors.push("Select an employment type")
            console.log(createDialogState.type.valueOf)
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
            axios({
                url: `${BASE_URL}/roles/` + jobPageState.selectedRoleId + '/jobs',
                method: 'post',
                timeout: 10000,
                data: {
                    title: createDialogState.title,
                    location: createDialogState.location,
                    type: createDialogState.type,
                    description: createDialogState.description,
                }
            }).then((resp) => {
                if (resp.status === 200) {
                    fetchJobs(jobPageState.selectedRoleId)
                }
                else {
                    setPageState({
                        ...jobPageState,
                        listOfJobs: [],
                        postJobListRequestStatus: JobsPageStatus.Error,
                        searchFetchError: 'There was an error adding to the list of jobs. Please try again later'
                    })
                }
            }).catch((error) => {
                setPageState({
                    ...jobPageState,
                    listOfJobs: [],
                    postJobListRequestStatus: JobsPageStatus.Error,
                    searchFetchError: 'There was an error adding to the list of jobs. Please try again later'
                })
            })

            setPageState({
                ...jobPageState,
                listOfJobs: [
                    ...jobPageState.listOfJobs,
                    {
                        title: createDialogState.title,
                        location: createDialogState.location,
                        type: createDialogState.type,
                        description: createDialogState.description,
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
            dataField: 'title',
            text: 'Name',
        },
        {
            dataField: 'location',
            text: 'Location',
        },
        {
            dataField: 'type',
            text: 'Type'
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
                                    location: row.location,
                                    type: row.type,
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

    const handleEditJob = () => {
        let errors = []
        if (!editDialogState.title || editDialogState.title.length === 0) {
            errors.push("Job title cannot be empty")
        }
        if (!editDialogState.location || editDialogState.location.length === 0) {
            errors.push("Location name cannot be empty")
        }
        if (!editDialogState.type || editDialogState.type.length === 0) {
            errors.push("Employment type cannot be empty")
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
            axios({
                url: `${BASE_URL}/roles/` + jobPageState.listOfJobs[editDialogState.index].roleId + '/jobs/' + jobPageState.listOfJobs[editDialogState.index].jobId,
                method: 'patch',
                timeout: 10000,
                data: {
                    title: editDialogState.title,
                    location: editDialogState.location,
                    type: editDialogState.type,
                    description: editDialogState.description,
                }
            }).then((resp) => {
                if (resp.status === 200) {
                    fetchJobs()
                }
                else {
                    setPageState({
                        ...jobPageState,
                        listOfJobs: [],
                        patchJobListRequestStatus: JobsPageStatus.Error,
                        searchFetchError: 'There was an error updating the list of jobs. Please try again later'
                    })
                }
            }).catch((error) => {
                setPageState({
                    ...jobPageState,
                    listOfJobs: [],
                    patchJobListRequestStatus: JobsPageStatus.Error,
                    searchFetchError: 'There was an error updating the list of jobs. Please try again later'
                })
            })

            setPageState({
                ...jobPageState,
                listOfJobs: [
                    ...jobPageState.listOfJobs,
                    {
                        title: editDialogState.title,
                        location: editDialogState.location,
                        type: editDialogState.type,
                        description: editDialogState.description,
                    }
                ],
            })
            setEditDialogState({
                ...editDialogState,
                show: false,
            })

            let newJobs = []
            for (let i = 0; i < jobPageState.listOfJobs.length; i++) {
                if (i === editDialogState.index) {
                    newJobs.push({
                        title: editDialogState.title,
                        location: editDialogState.location,
                        type: editDialogState.type,
                        description: editDialogState.description,
                    })
                }
                else {
                    newJobs.push(jobPageState.listOfJobs[i])
                }
            }
            setPageState({
                ...jobPageState,
                listOfJobs: newJobs
            })
            setEditDialogState({
                ...editDialogState,
                show: false,
            })
        }
    }

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
                onLocationChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        location: e.target.value
                    })
                }}

                onTypeChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        type: e.target.value
                    })
                }}
                onDescriptionChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        description: e.target.value
                    })
                }}
                name={editDialogState.title}
                location={editDialogState.location}
                type={editDialogState.type}
                description={editDialogState.description}
            />
            <JobEditDialog
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
                        handler: createJob,
                        variant: "primary"
                    }
                ]}
                errors={createDialogState.errors}
                onTitleChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        title: e.target.value
                    })
                }}
                onLocationChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        location: e.target.value
                    })
                }}
                onTypeChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        type: e.target.value
                    })
                }}
                onDescriptionChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        description: e.target.value
                    })
                }}
                name={createDialogState.title}
                location={createDialogState.location}
                type={createDialogState.type}
                description={createDialogState.description}
            />
            <div>
                <ToolkitProvider
                    keyField="id"
                    data={jobPageState.listOfJobs}
                    columns={columns}
                    search
                >
                    {
                        props => (
                            <div className={"employees-container"}>
                                <Breadcrumb>
                                    <Breadcrumb.Item href="/dashboard/home">Dashboard</Breadcrumb.Item>
                                    <Breadcrumb.Item active>Open Positions: Jobs</Breadcrumb.Item>
                                </Breadcrumb>
                                <h1>Manage Jobs</h1>

                                {
                                    (jobPageState.getRolesListRequestStatus === RolesFetchStatus.InProgress) &&
                                    <div className={'row justify-content-center'}>
                                        <div className="spinner-border text-primary align-self-" role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                    </div>
                                }
                                {
                                    jobPageState.rolesFetchError &&
                                    <div className={'search-result-error'}>
                                        {jobPageState.rolesFetchError}
                                    </div>
                                }
                                {
                                    (jobPageState.getRolesListRequestStatus === RolesFetchStatus.Success) &&
                                    <div className="position-selection-control">
                                        <div className={"position-selection-header"}>
                                            <h5>Select a role to see the jobs opened for it:</h5>
                                        </div>
                                        <div className={"position-selection-dropdown"}>
                                            <div className="input-group input-group-sm">
                                                <Dropdown className={"input-group-text"}>
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        <Filter /> Select Role
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {
                                                            jobPageState.listOfRoles.map((role) => {
                                                                return (
                                                                    <Dropdown.Item key={role.id} onClick={(e) => {
                                                                        setPageState({
                                                                            ...jobPageState,
                                                                            selectedRoleId: role.id
                                                                        })
                                                                    }} active={jobPageState.selectedRoleId === role.id}>
                                                                        {role.title}
                                                                    </Dropdown.Item>
                                                                )
                                                            })
                                                        }
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                }

                                {
                                    jobPageState.selectedRoleId &&
                                    <div>
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
                                }
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        </div>
    )
}