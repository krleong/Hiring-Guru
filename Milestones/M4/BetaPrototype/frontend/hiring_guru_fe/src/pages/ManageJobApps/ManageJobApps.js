import './ManageJobApps.css';
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
                        Applicant Name
                    </label>
                    <input className="form-control" id="recruitmentStageNameInput"
                        placeholder="First name Last name"
                        value={props.name}
                        onChange={props.onApplicantNameChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Applicant Email
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="HirnigGuru@example.com"
                        value={props.email}
                        onChange={props.onApplicantEmailChange}
                    >
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Prospective Job
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="Enter job"
                        value={props.resume}
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
                        value={props.profileLink}
                        onChange={props.onRoleChange}
                    >
                    </input>
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Prospective Company
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="Enter coverLetter name"
                        value={props.coverLetter}
                        onChange={props.onCompanyChange}
                    >
                    </input>
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Date and Time Submitted
                    </label>
                    <input className="form-control" id="recruitmentStageDescriptionInput"
                        placeholder="MM/DD/YEAR at 0:00 AM"
                        value={props.timestamp}
                        onChange={props.onTimestampChange}
                    >
                    </input>
                </div> */}
            </div>
        </Dialog>
    )
}
const JobAppPageStatus = {
    NotStarted: "NotStarted",
    InProgress: "InProgress",
    Error: "Error",
    Success: "Success",
}

const JobsFetchStatus = {
    NotStarted: "NotStarted",
    InProgress: "InProgress",
    Error: "Error",
    Success: "Success",
}

const parseJobApps = (jobApps) => {
    let parsedjobApps = []
    for (let i = 0; i < jobApps.length; i++) {
        parsedjobApps.push({
            jobId: jobApps[i].id,
            jobAppId: jobApps[i].id,
            applicantName: jobApps[i].applicant_name,
            applicantEmail: jobApps[i].applicant_email,
            jobTitle: jobApps[i].job.title,
            roleTitle: jobApps[i].job.role.title,
            company: jobApps[i].job.company,
            submittedAt: jobApps[i].submitted_at,
        })
    }
    return parsedjobApps
}


export function ManageJobApps() {
    const [jobAppPageState, setPageState] = useState({
        listOfJobApps: [],
        listOfJobs: [],
        selectedJobId: undefined,
        getJobsListRequestStatus: JobsFetchStatus.NotStarted,
        jobsFetchError: '',
        searchString: '',
        getJobAppListRequestStatus: JobAppPageStatus.NotStarted,
        searchFetchError: '',
    })

    const { SearchBar } = Search;

    useEffect(() => {
        if (jobAppPageState.selectedJobId) {
            fetchJobApps(jobAppPageState.selectedJobId)
        } else {
            fetchJobs()
        }
    }, [jobAppPageState.selectedJobId]);

    const [editDialogState, setEditDialogState] = useState({
        show: false,
        jobAppId: "",
        applicantName: "",
        applicantEmail: "",
        jobTitle: "",
        roleTitle: "",
        company: "",
        submittedAt: "",
        errors: [],
        index: undefined
    })

    const [createDialogState, setCreateDialogState] = useState({
        show: false,
        jobAppId: "",
        applicantName: "",
        applicantEmail: "",
        jobTitle: "",
        roleTitle: "",
        company: "",
        submittedAt: "",
        errors: [],
        index: undefined
    })

    const appContext = useContext(ApplicationContext);

    const fetchJobApps = (jobID) => {
        setPageState({
            ...jobAppPageState,
            listOfJobApps: [],
            getJobAppListRequestStatus: JobAppPageStatus.InProgress,
            searchFetchError: ''
        })
        axios({
            // url: `${BASE_URL}/jobs/jobApps`,
            // TEMP FIX: GET ALL EMPLOYEES FOR coverLetter ID 177
            url: `${BASE_URL}/jobs/${jobID}/jobapps`,
            method: 'get',
            timeout: 10000,
        }).then((resp) => {
            console.log(resp.data);
            if (resp.status === 200) {
                setPageState({
                    ...jobAppPageState,
                    listOfJobApps: parseJobApps(resp.data),
                    getJobAppListRequestStatus: JobAppPageStatus.Success,
                })
            }
            else {
                setPageState({
                    ...jobAppPageState,
                    listOfJobApp: [],
                    getJobAppListRequestStatus: JobAppPageStatus.Error,
                    searchFetchError: 'There was an error fetching the list of job applications. Please try again later'
                })
            }
        }).catch((error) => {
            setPageState({
                ...jobAppPageState,
                listOfJobApps: [],
                getJobAppListRequestStatus: JobAppPageStatus.Error,
                searchFetchError: 'There was an error fetching the list of job applications. Please try again later'
            })
        })
    }

    const fetchJobs = () => {
        setPageState({
            ...jobAppPageState,
            listOfJobs: [],
            getJobsListRequestStatus: JobsFetchStatus.InProgress,
            jobsFetchError: ''
        })

        axios({
            url: `${BASE_URL}/roles/jobs`,
            method: 'get',
            timeout: 10000,
        }).then((resp) => {
            if (resp.status === 200) {
                setPageState({
                    ...jobAppPageState,
                    listOfJobs: resp.data,
                    getJobsListRequestStatus: JobsFetchStatus.Success,
                })
            }
            else {
                setPageState({
                    ...jobAppPageState,
                    listOfJobs: [],
                    getJobsListRequestStatus: JobsFetchStatus.Error,
                    jobsFetchError: 'There was an error fetching the list of jobs. Please try again later'
                })
            }
        }).catch((error) => {
            setPageState({
                ...jobAppPageState,
                listOfJobs: [],
                getJobsListRequestStatus: JobsFetchStatus.Error,
                jobsFetchError: 'There was an error fetching the list of jobs. Please try again later'
            })
        })
    }

    const removeJobApp = (index) => {
        axios({
            url: `${BASE_URL}/jobs/` + jobAppPageState.listOfJobApps[index].roleId + '/jobapps/' + jobAppPageState.listOfJobApps[index].jobId,           
            method: 'delete',
            timeout: 10000,
        }).then((resp) => {
            if (resp.status === 200) {
                fetchJobApps()
            }
            else {
                setPageState({
                    ...jobAppPageState,
                    listOfJobApps: [],
                    deleteJobAppListRequestStatus: JobAppPageStatus.Error,
                    searchFetchError: 'There was an error deleting the job application. Please try again later'
                })
            }
        }).catch((error) => {
            setPageState({
                ...jobAppPageState,
                listOfJobApp: [],
                deleteJobAppListRequestStatus: JobAppPageStatus.Error,
                searchFetchError: 'There was an error deleting the job applications. Please try again later'
            })
        })
        let newJobApps = []
        for (let i = 0; i < jobAppPageState.listOfJobApps.length; i++) {
            i !== index && newJobApps.push(jobAppPageState.listOfJobApps[i])
        }
        appContext.closeDialog()
        setPageState({
            ...jobAppPageState,
            listOfJobApps: newJobApps
        })
    }

    const createJobApp = () => {
        let errors = []
        if (!createDialogState.applicantName || createDialogState.applicantName.length === 0) {
            errors.push("Applicant name cannot be empty")
        }
        if (!createDialogState.applicantEmail || createDialogState.applicantEmail.length === 0) {
            errors.push("Applicant email cannot be empty")
        }
        if (!createDialogState.jobTitle || createDialogState.jobTitle.length === 0) {
            errors.push("Prospective job title cannot be empty")
        }
        if (!createDialogState.roleTitle || createDialogState.roleTitle.length === 0) {
            errors.push("Prospective job role cannot be empty")
        }
        if (!createDialogState.company || createDialogState.company.length === 0) {
            errors.push(" Company cannot be empty")
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
                url: `${BASE_URL}/jobs/` + jobAppPageState.selectedJobId + '/jobapps',
                method: 'post',
                timeout: 10000,
                data: {
                    jobAppId: createDialogState.jobAppId,
                    applicantName: createDialogState.applicantName,
                    applicantEmail: createDialogState.applicantEmail,
                    jobTitle: createDialogState.jobTitle,
                    roleTitle: createDialogState.roleTitle,
                    company:createDialogState.company,
                    submittedAt: createDialogState.submittedAt,

                }
            }).then((resp) => {
                if (resp.status === 200) {
                    fetchJobApps()
                }
                else {
                    setPageState({
                        ...jobAppPageState,
                        listOfJobApps: [],
                        postJobAppListRequestStatus: JobAppPageStatus.Error,
                        searchFetchError: 'There was an error adding to the list of job applications. Please try again later'
                    })
                }
            }).catch((error) => {
                setPageState({
                    ...jobAppPageState,
                    listOfJobApps: [],
                    postJobAppsListRequestStatus: JobAppPageStatus.Error,
                    searchFetchError: 'There was an error adding to the list of job applications. Please try again later'
                })
            })
            setPageState({
                ...jobAppPageState,
                listOfjobApps: [
                    ...jobAppPageState.listOfJobApps,
                    {
                        jobAppId: createDialogState.jobAppId,
                        applicantName: createDialogState.applicantName,
                        applicantEmail: createDialogState.applicantEmail,
                        jobTitle: createDialogState.jobTitle,
                        roleTitle: createDialogState.roleTitle,
                        company:createDialogState.company,
                        submittedAt: createDialogState.submittedAt,
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
            dataField: 'applicantName',
            text: 'Name'
        },
        {
            dataField: 'applicantEmail',
            text: 'Email'
        },
        {
            dataField: 'jobTitle',
            text: 'Job Title'
        },
        {
            dataField: 'roleTitle',
            text: 'Role'
        },
        {
            dataField: 'company',
            text: 'Company'
        },
        {
            dataField: 'submittedAt',
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
                                    coverLetter: row.coverLetter,
                                })
                            }}>Contact</DropdownItem> */}
                            <DropdownItem onClick={() => {
                                setEditDialogState({
                                    ...editDialogState,
                                    show: true,
                                    index: index,
                                    applicantName: row.applicantName,
                                    applicantEmail: row.applicantEmail,
                                    jobTitle: row.jobTitle,
                                    roleTitle: row.roleTitle,
                                    company: row.company,
                                    submittedAt: row.submittedAt
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
                                            title: "Remove application",
                                            handler: () => removeJobApp(index),
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

    const handleEditJobApp = () => {
        let errors = []
        if (!editDialogState.applicantName || editDialogState.applicanttName.length === 0) {
            errors.push("Applicant name cannot be empty")
        }
        if (!editDialogState.applicantEmail || editDialogState.applicantEmail.length === 0) {
            errors.push("Applicant email cannot be empty")
        }
        if (!editDialogState.jobTitle || editDialogState.jobTitle.length === 0) {
            errors.push("Prospective job cannot be empty")
        }
        if (!editDialogState.roleTitle || editDialogState.roleTitle.length === 0) {
            errors.push("Prospective job role cannot be empty")
        }
        if (!editDialogState.company || editDialogState.company.length === 0) {
            errors.push("Company cannot be empty")
        }
        // if (!editDialogState.timestamp || editDialogState.timestamp.length === 0) {
        //     errors.push("Submission timestamp cannot be empty")
        // }
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
                // url: `${BASE_URL}/jobs/jobID/jobapps/jobappID` + 177 + `/jobapps/` + jobappPageState.listOfJobApps[editDialogState.index].id,
                url: `${BASE_URL}/jobs/` + jobAppPageState.listOfJobApps[editDialogState.index].jobId + '/jobapps/' + jobAppPageState.listOfJobApps[editDialogState.index].jobappId,
                method: 'patch',
                timeout: 10000,
                data: {
                    jobAppId: editDialogState.jobAppId,
                    applicantName: editDialogState.applicantName,
                    applicantEmail: editDialogState.applicantEmail,
                    jobTitle: editDialogState.jobTitle,
                    roleTitle: editDialogState.roleTitle,
                    company: editDialogState.company,
                    submittedAt: editDialogState.submittedAt,
                }
            }).then((resp) => {
                if (resp.status === 200) {
                    fetchJobApps()
                }
                else {
                    setPageState({
                        ...jobAppPageState,
                        listOfjobapps: [],
                        patchJobAppListRequestStatus: JobAppPageStatus.Error,
                        searchFetchError: 'There was an error updating the list of job applications. Please try again later'
                    })
                }
            }).catch((error) => {
                setPageState({
                    ...jobAppPageState,
                    listOfJobApps: [],
                    patchJobAppsListRequestStatus: JobAppPageStatus.Error,
                    searchFetchError: 'There was an error updating the list of job applications. Please try again later'
                })
            })

            setPageState({
                ...jobAppPageState,
                listOfJobApps: [
                    ...jobAppPageState.listOfJobApps,
                    {
                        jobAppId: editDialogState.jobAppId,
                        applicantName: editDialogState.applicantName,
                        applicantEmail: editDialogState.applicantEmail,
                        jobTitle: editDialogState.jobTitle,
                        roleTitle: editDialogState.roleTitle,
                        company: editDialogState.company,
                        submittedAt: editDialogState.submittedAt,
                    }
                ],
            })
            setEditDialogState({
                ...editDialogState,
                show: false,
            })
            let newJobApps = []
            for (let i = 0; i < jobAppPageState.listOfJobApps.length; i++) {
                if (i === editDialogState.index) {
                    newJobApps.push({
                        jobAppId: editDialogState.jobAppId,
                         applicantName: editDialogState.applicantName,
                        applicantEmail: editDialogState.applicantEmail,
                        jobTitle: editDialogState.jobTitle,
                        roleTitle: editDialogState.roleTitle,
                        company: editDialogState.company,
                        submittedAt: editDialogState.submittedAt,
                    })
                }
                else {
                    newJobApps.push(jobAppPageState.listOfJobApps[i])
                }
            }
            setPageState({
                ...jobAppPageState,
                listOfJobApps: newJobApps
            })
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
                onApplicantNameChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        applicantName: e.target.value
                    })
                }}
                onApplicantEmailChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        applicantEmail: e.target.value
                    })
                }}
                onJobChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        jobTitle: e.target.value
                    })
                }}
                onRoleChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        roleTitle: e.target.value
                    })
                }}
                onCompanyChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        company: e.target.value
                    })
                }}


                jobAppId={editDialogState.jobAppId}
                applicantName={editDialogState.applicantName}
                applicantEmail={editDialogState.applicantEmail}
                jobTitle={editDialogState.jobTitle}
                roleTitle={editDialogState.roleTitle}
                company={editDialogState.company}
                submittedAt={editDialogState.submittedAt}
            // timestamp={editDialogState.timestamp}
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
                        handler: createJobApp,
                        variant: "primary"
                    }
                ]}
                errors={createDialogState.errors}
                onApplicantNameChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        applicantName: e.target.value
                    })
                }}
                onApplicantEmailChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        applicantEmail: e.target.value
                    })
                }}
                onJobChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        jobTitle: e.target.value
                    })
                }}
                onRoleChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        roleTitle: e.target.value
                    })
                }}
                onCompanyChange={(e) => {
                    setCreateDialogState({
                        ...createDialogState,
                        company: e.target.value
                    })
                }}
                jobAppId={createDialogState.jobAppId}
                applicantName={createDialogState.applicantName}
                applicantEmail={createDialogState.applicantEmail}
                jobTitle={createDialogState.jobTitle}
                roleTitle={createDialogState.roleTitle}
                company={createDialogState.company}
                submittedAt={createDialogState.submittedAt}
            />
            <div>
                <ToolkitProvider
                    keyField="id"
                    data={jobAppPageState.listOfJobApps}
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
                                {
                                    (jobAppPageState.getJobsListRequestStatus === JobsFetchStatus.InProgress) &&
                                    <div className={'row justify-content-center'}>
                                        <div className="spinner-border text-primary align-self-" role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                    </div>
                                }
                                {
                                    jobAppPageState.jobsFetchError &&
                                    <div className={'search-result-error'}>
                                        {jobAppPageState.jobsFetchError}
                                    </div>
                                }
                                {
                                    (jobAppPageState.getJobsListRequestStatus === JobsFetchStatus.Success) &&
                                    <div className="position-selection-control">
                                        <div className={"position-selection-header"}>
                                            <h5>Select a job to see the applications submitted for it:</h5>
                                        </div>
                                        <div className={"position-selection-dropdown"}>
                                            <div className="input-group input-group-sm">
                                                <Dropdown className={"input-group-text"}>
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        <Filter /> Select Job
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {
                                                            jobAppPageState.listOfJobs.map((job) => {
                                                                return (
                                                                    <Dropdown.Item key={job.id} onClick={(e) => {
                                                                        setPageState({
                                                                            ...jobAppPageState,
                                                                            selectedJobId: job.id
                                                                        })
                                                                    }} active={jobAppPageState.selectedJobId === job.id}>
                                                                        {job.title}
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
                                    jobAppPageState.selectedJobId &&
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
                                            >Add Submission</Button>
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