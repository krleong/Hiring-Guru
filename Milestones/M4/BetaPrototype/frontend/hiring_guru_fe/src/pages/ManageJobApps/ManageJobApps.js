import './ManageJobApps.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import React, { useContext, useState,useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Filter } from "react-bootstrap-icons";
import DropdownItem from "react-bootstrap/DropdownItem";
import { Dialog } from "../../components/Dialog/Dialog";
import { ApplicationContext } from "../../HiringGuru";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BASE_URL } from "../../components/configuration";


// const JobApps = [
//     {
//         title: "Farhan Haider",
//         job: "Software Engineer",
//         role: "Team Lead",
//         company: "Binary Brains",
//         timestamp: "11/10/2022 at 9:00 AM"
//     },
//     {
//         title: "Kenny Leong",
//         job: "Software Engineer",
//         role: "Frontend Engineer",
//         company: "Binary Brains",
//         timestamp: "11/10/2022 at 9:00 AM"
//     },
//     {
//         title: "Mamadou Bah",
//         job: "Software Engineer",
//         role: "Frontend Engineer",
//         company: "Binary Brains",
//         timestamp: "11/10/2022 at 9:00 AM"
//     },
//     {
//         title: "Khushi Khanna",
//         job: "Software Engineer",
//         role: "Backend Engineer",
//         company: "Binary Brains",
//         timestamp: "11/10/2022 at 9:00 AM"
//     }
// ]

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
                        Application Documents (PDF only)
                    </label>
                    <input type="file" className="form-control" id="inputGroupFile02" accept="application/pdf" />
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
const parseJobApps = (jobApps) => {
    let parsedjobApps = []
    for (let i = 0; i < jobApps.length; i++) {
        parsedjobApps.push({
            jobAppId: jobApps[i].id,
            applicantName: jobApps[i].applicant_name,
            applicantEmail: jobApps[i].applicant_email,
            jobTitle: jobApps[i].job.title,
            roleTitle: jobApps[i].job.role.title,
            company: jobApps[i].job.role.company.title,
            submittedAt: jobApps[i].submitted_at,
        })
    }
    return parsedjobApps
}


export function ManageJobApps() {
    const [jobAppPageState, setPageState] = useState({
        listOfJobApps: [],
        searchString: '',
        getJobAppListRequestStatus: JobAppPageStatus.NotStarted,
        searchFetchError: '',
    })
    const { SearchBar } = Search;
    useEffect(() => {
        fetchJobApps()
    }, []);

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
        company:"",
        submittedAt: "",
        errors: [],
        index: undefined
    })

    const appContext = useContext(ApplicationContext);
    
    const fetchJobApps = () => {
        setPageState({
            ...jobAppPageState,
            listOfJobApps: [],
            getJobAppListRequestStatus: JobAppPageStatus.InProgress,
            searchFetchError: ''
        })
        axios({
            // url: `${BASE_URL}/api/v1/companies/177/employees`,
            // TEMP FIX: GET ALL EMPLOYEES FOR COMPANY ID 177
            url: `${BASE_URL}/jobs/jobapps`,
            method: 'get',
            timeout: 10000,
        }).then((resp) => {
           console.log(resp.data) ;
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

    const removeJobApp = (index) => {
        axios({
            url: `${BASE_URL}jobs/jobID/jobapps/jobAppID` + jobAppPageState.listOfJobApps[index].id,
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
        if (!createDialogState.jobAppId || createDialogState.jobAppId.length === 0) {
            errors.push("Prospective job title cannot be empty")
        }
        if (!createDialogState.roleTitle || createDialogState.roleTitle.length === 0) {
            errors.push("Prospective job role cannot be empty")
        }
        if (!createDialogState.company || createDialogState.company.length === 0) {
            errors.push("Company title cannot be empty")
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
                url: `${BASE_URL}/jobs/jobID/jobapps`,
                method: 'post',
                timeout: 10000,
                data: {
                    jobAppId: createDialogState.jobAppId,
                    applicantName: createDialogState.applicantName,
                    applicantEmail: createDialogState.applicantEmail,
                    jobTitle: createDialogState.jobTitle,
                    roleTitle: createDialogState.roleTitle,
                    company: createDialogState.company,
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
                        company: createDialogState.company,
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
                                    company: row.company,
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
                                    roleTitle:row.roleTitle,
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
                url: `${BASE_URL}/jobs/jobID/jobapps/jobappID` + 177 + `/jobapps/` + jobAppPageState.listOfJobApps[editDialogState.index].id,
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
                    fetchJobApps()
                }
                else {
                    setPageState({
                        ...jobAppPageState,
                        listOfjobapps: [],
                        patchJobAppListRequestStatus: JobAppPageStatus.Error,
                        searchFetchError: 'There was an error updating the list of job application. Please try again later'
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
            let newJobApps = []
            for (let i = 0; i < jobAppPageState.listOfJobApps.length; i++) {
                if (i === editDialogState.index) {
                    newJobApps.push({
                        name: editDialogState.name,
                        email: editDialogState.email,
                        createdAt: editDialogState.createdAt,
                        designation: editDialogState.designation,
                        roles: editDialogState.roles
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
                // onTimestampChange={(e) => {
                //     setEditDialogState({
                //         ...editDialogState,
                //         timestamp: e.target.value
                //     })
                // }}
                name={editDialogState.title}
                job={editDialogState.job}
                role={editDialogState.role}
                company={editDialogState.company}
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
                // onTimestampChange={(e) => {
                //     setCreateDialogState({
                //         ...createDialogState,
                //         timestamp: e.target.value
                //     })
                // }}
                name={createDialogState.title}
                role={createDialogState.role}
                company={createDialogState.company}
            // timestamp={createDialogState.timestamp}
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