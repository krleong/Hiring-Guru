import './ManageJobs.css';
import Dropdown from "react-bootstrap/Dropdown";
import {/*Modal,*/ OverlayTrigger, Tooltip } from "react-bootstrap";
import {
    ArrowBarDown,
    ArrowBarUp,
    ArrowDown,
    Filter,
    // HeartFill,
    // Pencil,
    PencilFill,
    Trash3Fill
} from "react-bootstrap-icons";
import React, { useContext, /*useEffect,*/ useState } from "react";
import Button from "react-bootstrap/Button";
import { ApplicationContext } from "../../HiringGuru";
import { Dialog } from "../../components/Dialog/Dialog";

const JobRoles = [
    {
        ui: 'View Jobs',
        server: 'JOB_POSTS'
    },

]

const JobStepType = {
    Interview: {
        ui: 'Interview',
        server: 'INTERVIEW'
    },
    ProgrammingTest: {
        ui: 'Programming Test',
        server: 'PROGRAMMING_TEST'
    },
    WorkplaceType: {
        ui: 'Workplace Type',
        server: 'WORKPLACE_TYPE'
    },
    Employment: {
        ui: 'Employment',
        server: 'EMPLOYMENT'
    },
    Location: {
        ui: 'Location',
        server: 'LOCATION'
    },
}

const JobPipelineSoftwareEngineer = [
    {
        title: "Software Engineer",
        Location: "San Francisco",
        Employment: "Full-Time",
        Workplace: "On-site",
        detail: "An IT professional who designs, develops and maintains computer software at a company. They " + 
       "use their creativity and technical skills and apply the principles of software engineering to help " +
        "solve new and ongoing problems for an organization."
    },
    {
        title: "Product Manager",
        Location: "New York",
        Employment: "Part-Time",
        Workplace: "Remote",
        detail: "A professional who combines both product planning and marketing to manage" + 
        "the entire life cycle of one project. They're responsible for gathering customer" +
        "requirements and defining their vision with engineering as well as overseeing product" +
        "strategy, pricing and positioning strategies." 
    },
    {
        title: "Data Analyst",
        Location: "San Francisco",
        Employment: "Internship",
        Workplace: "On-site",
        detail: "Data analysts are responsible for analyzing data using statistical techniques, " +
        "implementing and maintaining databases, gathering data from primary and secondary sources, " +
        "identifying, analyzing and interpreting trends from the data." 
    },
]

const JobPipelineCEO = [
    {
        type: JobStepType.Interview,
        title: "Interview Evaluation",
        detail: "Interview with the founder to discuss past experience and assess personality traits."
    },
    {
        type: JobStepType.Interview,
        title: "HR Interview",
        detail: "HR Interview should cover discussion about personality and salary package."
    },
]

const JobPipelineRoleMap = {
    JOB_POSTS: JobPipelineSoftwareEngineer,
    CEO: JobPipelineCEO
}

function JobStepDialog(props) {
    return (
        <Dialog
            show={props.show}
            title={"Create a new Job"}
            actions={props.actions}
        >
            <div>
                <div className={"Job-step-errors"}>
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
                <div className="mb-Job">
                    <label htmlFor="JobStageTitleInput" className="form-label">
                        Job Title
                    </label>
                    <input className="form-control" id="JobStageTitleInput"
                        placeholder="Enter title ..."
                        value={props.stepTitle}
                        onChange={props.onTitleChange}
                    />
                </div>
                <div className="mb-Work">
                    <label htmlFor="JobStageWorkplaceInput" className="form-label">
                        Workplace Type
                    </label>
                    <input className="form-control" id="JobStageWorkplaceInput"
                        placeholder="On-site, Remote, Hybrid"
                        value={props.stepWorkplace}
                        onChange={props.onWorkplaceChange}
                    />
                </div>
                <div className="mb-Employment">
                    <label htmlFor="JobStageEmploymentInput" className="form-label">
                        Employment Type
                    </label>
                    <input className="form-control" id="JobStageEmploymentInput"
                        placeholder="Full-Time, Part-Time, Internship"
                        value={props.stepEmployment}
                        onChange={props.onEmploymentChange}
                    />
                </div>
                <div className="mb-Location">
                    <label htmlFor="JobLocationInput" className="form-label">
                        Job Location
                    </label>
                    <input className="form-control" id="JobLocationInput"
                        placeholder="San Francisco, CA"
                        value={props.Location}
                        onChange={props.onLocationChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="JobStageDescriptionInput" className="form-label">
                        Description
                    </label>
                    <textarea className="form-control" id="JobStageDescriptionInput"
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


function JobProcess() {
    const appContext = useContext(ApplicationContext);
    const [JobProcessState, setJobProcessState] = useState({
        selectedJobRole: JobRoles.All,
        JobProcess: undefined
    })
    const [createJobStepFormState, setCreateJobStepFormState] = useState({
        showCreationDialog: false,
        showModificationDialog: false,
        title: "",
        Workplace:"",
        Employment:"",
        Location:"",
        description: "",
        errors: [],

    })
    const [modifyJobStepFormState, setModifyJobStepFormState] = useState({
        showModificationDialog: false,
        title: "",
        Workplace:"",
        Employment:"",
        Location:"",
        description: "",
        errors: [],
        index: undefined
    })

    const moveStepUp = (index) => {
        console.log("Moving step up")
        let process = JobProcessState.JobProcess
        const saveState = process[index - 1]
        process[index - 1] = process[index]
        process[index] = saveState
        setJobProcessState({
            ...JobProcessState,
            JobProcess: process
        })
    }
    const moveStepDown = (index) => {
        console.log("Moving step down")
        let process = JobProcessState.JobProcess
        const saveState = process[index + 1]
        process[index + 1] = process[index]
        process[index] = saveState
        setJobProcessState({
            ...JobProcessState,
            ...JobProcessState,
            JobProcess: process
        })
    }

    const modifyJobStep = () => {
        let newSteps = []
        for (let i = 0; i < JobProcessState.JobProcess.length; i++) {
            if (i === modifyJobStepFormState.index) {
                newSteps.push({
                    type: JobStepType[modifyJobStepFormState.type],
                    title: modifyJobStepFormState.title,
                    Workplace:modifyJobStepFormState.Workplace,
                    Employment:modifyJobStepFormState.Employment,
                    Location:modifyJobStepFormState.Location,
                    detail: modifyJobStepFormState.description
                })
            }
            else {
                newSteps.push(JobProcessState.JobProcess[i])
            }
        }
        setModifyJobStepFormState({
            ...modifyJobStepFormState,
            showModificationDialog: false
        })
        setJobProcessState({
            ...JobProcessState,
            JobProcess: newSteps
        })
    }

    const createJobStep = () => {
        let errors = []
        if (!createJobStepFormState.title || createJobStepFormState.title.length === 0) {
            errors.push("Please provide a title for this stage")
        }
        if (!createJobStepFormState.description || createJobStepFormState.description.length === 0) {
            errors.push("Please provide a description")
        }
        if (!createJobStepFormState.Workplace || createJobStepFormState.Workplace.length === 0) {
            errors.push("Please provide the workplace")
        }
        if (!createJobStepFormState.Employment || createJobStepFormState.Employment.length === 0) {
            errors.push("Please provide the employment type")
        }
        if (!createJobStepFormState.Location || createJobStepFormState.Location.length === 0) {
            errors.push("Please provide the location")
        }
        if (errors.length > 0) {
            setCreateJobStepFormState({
                ...createJobStepFormState,
                showCreationDialog: true,
                errors: errors,
            })
        }
        else {
            setCreateJobStepFormState({
                ...createJobStepFormState,
                showCreationDialog: false
            })
            setJobProcessState({
                ...JobProcessState,
                JobProcess: [
                    ...JobProcessState.JobProcess,
                    {
                        type: JobStepType[createJobStepFormState.type],
                        title: createJobStepFormState.title,
                        detail: createJobStepFormState.description,
                        Workplace: createJobStepFormState.Workplace,
                        Employment: createJobStepFormState.Employment,
                        Location: createJobStepFormState.Location,
                    }
                ]
            })
        }
    }

    const removeJobStep = (index) => {
        let newSteps = []
        for (let i = 0; i < JobProcessState.JobProcess.length; i++) {
            i !== index && newSteps.push(JobProcessState.JobProcess[i])
        }
        appContext.closeDialog()
        setJobProcessState({
            ...JobProcessState,
            JobProcess: newSteps
        })
    }
    return (
        <div>
            <JobStepDialog
                show={createJobStepFormState.showCreationDialog}
                title={"Add a new stage to the Job process"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setCreateJobStepFormState({
                                ...createJobStepFormState,
                                showCreationDialog: false
                            })
                        },
                        variant: "secondary"
                    },
                    {
                        title: "Create Step",
                        handler: createJobStep,
                        variant: "primary"
                    }
                ]}
                errors={createJobStepFormState.errors}
                onTitleChange={(e) => {
                    setCreateJobStepFormState({
                        ...createJobStepFormState,
                        title: e.target.value
                    })
                }}
                errors={createJobStepFormState.errors}
                onLocationChange={(e) => {
                    setCreateJobStepFormState({
                        ...createJobStepFormState,
                        Location: e.target.value
                    })
                }}
                
                errors={createJobStepFormState.errors}
                onEmploymentChange={(e) => {
                    setCreateJobStepFormState({
                        ...createJobStepFormState,
                        Employment: e.target.value
                    })
                }}
                errors={createJobStepFormState.errors}
                onWorkplaceChange={(e) => {
                    setCreateJobStepFormState({
                        ...createJobStepFormState,
                        Workplace: e.target.value
                    })
                }}
                onDescriptionChange={(e) => {
                    setCreateJobStepFormState({
                        ...createJobStepFormState,
                        description: e.target.value
                    })
                }}
                onStageTypeChange={(e) => {
                    setCreateJobStepFormState({
                        ...createJobStepFormState,
                        type: e.target.value
                    })
                }}
                selectedStageType={createJobStepFormState.type}
                stepTitle={createJobStepFormState.title}
                stepEmployment={createJobStepFormState.Employment}
                stepLocation={createJobStepFormState.Location}
                stepWorkplace={createJobStepFormState.Workplace}
                stepDescription={createJobStepFormState.description}
            />
            <JobStepDialog
                show={modifyJobStepFormState.showModificationDialog}
                title={"Add a new stage to the Job process"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setModifyJobStepFormState({
                                ...modifyJobStepFormState,
                                showModificationDialog: false
                            })
                        },
                        variant: "secondary"
                    },
                    {
                        title: "Modify stage",
                        handler: modifyJobStep,
                        variant: "primary"
                    }
                ]}
                errors={modifyJobStepFormState.errors}
                onTitleChange={(e) => {
                    setModifyJobStepFormState({
                        ...modifyJobStepFormState,
                        title: e.target.value
                    })
                }}
                onDescriptionChange={(e) => {
                    setModifyJobStepFormState({
                        ...modifyJobStepFormState,
                        description: e.target.value
                    })
                }}
                onStageTypeChange={(e) => {
                    setModifyJobStepFormState({
                        ...modifyJobStepFormState,
                        type: e.target.value
                    })
                }}
                selectedStageType={modifyJobStepFormState.type}
                stepTitle={modifyJobStepFormState.title}
                stepDescription={modifyJobStepFormState.description}
            />
            <div className={"page-container"}>
                <h1>Manage Jobs - NEED TO MAKE A TABLE</h1>
                <div className="role-selection-control">
                    <div className={"role-selection-header"}>
                        <h5>Please select an action</h5>
                    </div>
                    <div className={"role-selection-dropdown"}>
                        <div className="input-group input-group-sm">
                            <Dropdown className={"input-group-text"}>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <Filter /> Select Below
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        JobRoles.map((jobRole) => {
                                            return (
                                                <Dropdown.Item key={jobRole.ui} onClick={(e) => {
                                                    setJobProcessState({
                                                        ...JobProcessState,
                                                        JobProcess: JobPipelineRoleMap[jobRole.server],
                                                        selectedJobRole: jobRole
                                                    })
                                                }} active={JobProcessState.selectedJobRole === jobRole}>
                                                    {jobRole.ui}
                                                </Dropdown.Item>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                {
                    JobProcessState.JobProcess !== undefined &&
                    <div className={"Job-pipeline-detail-container"}>
                        <div className={"Job-pipeline-controls container-vcenter-hright"}>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setCreateJobStepFormState({
                                        ...createJobStepFormState,
                                        showCreationDialog: true
                                    })
                                }}
                            >
                                Post a new Job
                            </Button>
                        </div>
                        <div className={"Job-pipeline-detail"}>
                            {
                                JobProcessState.JobProcess.map((step, index) => {
                                    const lenSteps = JobProcessState.JobProcess.length
                                    return (
                                        <div key={`index-${step.title}`} className={"Job-pipeline-step row"}>
                                            <div className={"step-number-container container-all-center col-1"}>
                                            </div>
                                            <div className={"step-detail-container col-9"}>
                                                <div className={"step-detail"}>
                                                    <div href={'/dashboard/home'} className={'step-title h5'}>{step.title}</div>
                                                    <div className={'step-location'}>{step.Location}</div>
                                                    <div className={'step-employment'}>{step.Employment}</div>
                                                    <div className={'step-Workplace'}>{step.Workplace}</div>
                                                    <div className={'step-description'}>{step.detail}</div>
                                                </div>
                                            </div>
                                            <div className={"step-actions-container container-all-center col-2"}>
                                                <div className={"step-actions"}>
                                                    <div className={"icon-container"}>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip>Update Job</Tooltip>
                                                            }
                                                        >
                                                            <button type="button" className="btn btn-circle btn-sm btn-success"
                                                                onClick={() => {
                                                                    let stepType
                                                                    Object.keys(JobStepType).map((k) => {
                                                                        if (JobStepType[k].ui === step.type.ui) {
                                                                            stepType = k
                                                                        }
                                                                    })
                                                                    setModifyJobStepFormState({
                                                                        ...modifyJobStepFormState,
                                                                        title: step.title,
                                                                        employment: step.employment,
                                                                        location: step.location,
                                                                        Workplace: step.workplace,
                                                                        description: step.detail,
                                                                        type: stepType,
                                                                        showModificationDialog: true,
                                                                        index: index
                                                                    })
                                                                }}
                                                            >
                                                                <PencilFill></PencilFill>
                                                            </button>
                                                        </OverlayTrigger>
                                                    </div>
                                                    <div className={"icon-container"}>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip>Delete Job</Tooltip>
                                                            }
                                                        >
                                                            <button type="button" className="btn btn-circle btn-sm btn-danger"
                                                                onClick={() => appContext.openDialog(
                                                                    "Are you sure?",
                                                                    [
                                                                        {
                                                                            title: "Close",
                                                                            handler: appContext.closeDialog,
                                                                            variant: "secondary"
                                                                        },
                                                                        {
                                                                            title: "Remove Job",
                                                                            handler: () => removeJobStep(index),
                                                                            variant: "primary"
                                                                        }
                                                                    ],
                                                                    "Once deleted, this can't be undone. Are you sure you want to proceed?"
                                                                )}
                                                            >
                                                                <Trash3Fill></Trash3Fill>
                                                            </button>
                                                        </OverlayTrigger>
                                                    </div>
                                                    <div className={"icon-container"}>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip>Submit Job Referral</Tooltip>
                                                            }
                                                        >
                                                            <button href={'/job-referral'} type="button" className="btn btn-circle btn-sm btn-primary">
                                                            
                                                            
   
                                                                <PencilFill></PencilFill>
                                                            </button>
                                                        </OverlayTrigger>
                                                    </div>
                                                    {
                                                        index !== 0 && <div className={"icon-container"}>
                                                            
                                                        </div>
                                                    }
                                                    {
                                                        index !== lenSteps - 1 && <div className={"icon-container"}>
                                                        
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            {
                                                index !== lenSteps - 1 && <div className={"step-detail-footer col-12"}>
                                                   
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default JobProcess;