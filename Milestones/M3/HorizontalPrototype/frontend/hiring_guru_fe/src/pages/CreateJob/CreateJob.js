import './CreateJob.css';
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
        ui: 'Job Posts',
        server: 'JOB_POSTS'
    },
    {
        ui: 'CEO',
        server: 'CEO'
    },
    {
        ui: 'Job Posts',
        server: 'Job Posts'
    }
]

const RecruitmentStepType = {
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

const RecruitmentPipelineSoftwareEngineer = [
    {
        title: "First Technical Interview",
        Location: "San Francisco",
        Employment: "Full-Time",
        Workplace: "On-site",
        detail: "First interview should be with a Software Engineer. It should cover basic" +
            " concepts like OOP, DS and Problem Solving."
    },
    {
        type: RecruitmentStepType.Interview,
        title: "Second Technical Interview",
        detail: "First interview should be with a Software Engineer. It should cover advanced" +
            " aspects like Algorithms, Design and Networks."
    },
    {
        type: RecruitmentStepType.ProgrammingTest,
        title: "HackerRank Test",
        detail: "First interview should be with a Software Engineer. It should cover all" +
            " the technical aspects like OOP, DB, DS, Algorithms and Networks."
    },
    {
        type: RecruitmentStepType.Interview,
        title: "HR Interview",
        detail: "HR Interview should cover discussion about personality and salary package."
    },
]

const RecruitmentPipelineCEO = [
    {
        type: RecruitmentStepType.Interview,
        title: "Interview Evaluation",
        detail: "Interview with the founder to discuss past experience and assess personality traits."
    },
    {
        type: RecruitmentStepType.Interview,
        title: "HR Interview",
        detail: "HR Interview should cover discussion about personality and salary package."
    },
]

const RecruitmentPipelineRoleMap = {
    JOB_POSTS: RecruitmentPipelineSoftwareEngineer,
    CEO: RecruitmentPipelineCEO
}

function RecruitmentStepDialog(props) {
    return (
        <Dialog
            show={props.show}
            title={"Create a new Job"}
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
                <div className="mb-Job">
                    <label htmlFor="recruitmentStageTitleInput" className="form-label">
                        Job Title
                    </label>
                    <input className="form-control" id="recruitmentStageTitleInput"
                        placeholder="Enter title ..."
                        value={props.stepTitle}
                        onChange={props.onTitleChange}
                    />
                </div>
                <div className="mb-Work">
                    <label htmlFor="recruitmentStageWorkplaceInput" className="form-label">
                        Workplace Type
                    </label>
                    <input className="form-control" id="recruitmentStageWorkplaceInput"
                        placeholder="On-site, Remote, Hybrid"
                        value={props.stepWorkplace}
                        onChange={props.onWorkplaceChange}
                    />
                </div>
                <div className="mb-Employment">
                    <label htmlFor="recruitmentStageEmploymentInput" className="form-label">
                        Employment Type
                    </label>
                    <input className="form-control" id="recruitmentStageEmploymentInput"
                        placeholder="Full-Time, Part-Time, Internship"
                        value={props.stepEmployment}
                        onChange={props.onEmploymentChange}
                    />
                </div>
                <div className="mb-Location">
                    <label htmlFor="recruitmentLocationInput" className="form-label">
                        Job Location
                    </label>
                    <input className="form-control" id="recruitmentLocationInput"
                        placeholder="San Francisco, CA"
                        value={props.Location}
                        onChange={props.onLocationChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Description
                    </label>
                    <textarea className="form-control" id="recruitmentStageDescriptionInput"
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


function RecruitmentProcess() {
    const appContext = useContext(ApplicationContext);
    const [recruitmentProcessState, setRecruitmentProcessState] = useState({
        selectedJobRole: JobRoles.All,
        recruitmentProcess: undefined
    })
    const [createRecruitmentStepFormState, setCreateRecruitmentStepFormState] = useState({
        showCreationDialog: false,
        showModificationDialog: false,
        title: "",
        Workplace:"",
        Employment:"",
        Location:"",
        description: "",
        errors: [],

    })
    const [modifyRecruitmentStepFormState, setModifyRecruitmentStepFormState] = useState({
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
        let process = recruitmentProcessState.recruitmentProcess
        const saveState = process[index - 1]
        process[index - 1] = process[index]
        process[index] = saveState
        setRecruitmentProcessState({
            ...recruitmentProcessState,
            recruitmentProcess: process
        })
    }
    const moveStepDown = (index) => {
        console.log("Moving step down")
        let process = recruitmentProcessState.recruitmentProcess
        const saveState = process[index + 1]
        process[index + 1] = process[index]
        process[index] = saveState
        setRecruitmentProcessState({
            ...recruitmentProcessState,
            ...recruitmentProcessState,
            recruitmentProcess: process
        })
    }

    const modifyRecruitmentStep = () => {
        let newSteps = []
        for (let i = 0; i < recruitmentProcessState.recruitmentProcess.length; i++) {
            if (i === modifyRecruitmentStepFormState.index) {
                newSteps.push({
                    type: RecruitmentStepType[modifyRecruitmentStepFormState.type],
                    title: modifyRecruitmentStepFormState.title,
                    Workplace:modifyRecruitmentStepFormState.Workplace,
                    Employment:modifyRecruitmentStepFormState.Employment,
                    Location:modifyRecruitmentStepFormState.Location,
                    detail: modifyRecruitmentStepFormState.description
                })
            }
            else {
                newSteps.push(recruitmentProcessState.recruitmentProcess[i])
            }
        }
        setModifyRecruitmentStepFormState({
            ...modifyRecruitmentStepFormState,
            showModificationDialog: false
        })
        setRecruitmentProcessState({
            ...recruitmentProcessState,
            recruitmentProcess: newSteps
        })
    }

    const createRecruitmentStep = () => {
        let errors = []
        if (!createRecruitmentStepFormState.title || createRecruitmentStepFormState.title.length === 0) {
            errors.push("Please provide a title for this stage")
        }
        if (!createRecruitmentStepFormState.description || createRecruitmentStepFormState.description.length === 0) {
            errors.push("Please provide a description")
        }
        if (!createRecruitmentStepFormState.Workplace || createRecruitmentStepFormState.Workplace.length === 0) {
            errors.push("Please provide the workplace")
        }
        if (!createRecruitmentStepFormState.employment || createRecruitmentStepFormState.employment.length === 0) {
            errors.push("Please provide the employment type")
        }
        if (!createRecruitmentStepFormState.location || createRecruitmentStepFormState.location.length === 0) {
            errors.push("Please provide the location")
        }
        if (errors.length > 0) {
            setCreateRecruitmentStepFormState({
                ...createRecruitmentStepFormState,
                showCreationDialog: true,
                errors: errors,
            })
        }
        else {
            setCreateRecruitmentStepFormState({
                ...createRecruitmentStepFormState,
                showCreationDialog: false
            })
            setRecruitmentProcessState({
                ...recruitmentProcessState,
                recruitmentProcess: [
                    ...recruitmentProcessState.recruitmentProcess,
                    {
                        type: RecruitmentStepType[createRecruitmentStepFormState.type],
                        title: createRecruitmentStepFormState.title,
                        detail: createRecruitmentStepFormState.description,
                        Workplace: createRecruitmentStepFormState.Workplace,
                        Employment: createRecruitmentStepFormState.Employment,
                        Location: createRecruitmentStepFormState.Location,
                    }
                ]
            })
        }
    }

    const removeRecruitmentStep = (index) => {
        let newSteps = []
        for (let i = 0; i < recruitmentProcessState.recruitmentProcess.length; i++) {
            i !== index && newSteps.push(recruitmentProcessState.recruitmentProcess[i])
        }
        appContext.closeDialog()
        setRecruitmentProcessState({
            ...recruitmentProcessState,
            recruitmentProcess: newSteps
        })
    }
    return (
        <div>
            <RecruitmentStepDialog
                show={createRecruitmentStepFormState.showCreationDialog}
                title={"Add a new stage to the recruitment process"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setCreateRecruitmentStepFormState({
                                ...createRecruitmentStepFormState,
                                showCreationDialog: false
                            })
                        },
                        variant: "secondary"
                    },
                    {
                        title: "Create Step",
                        handler: createRecruitmentStep,
                        variant: "primary"
                    }
                ]}
                errors={createRecruitmentStepFormState.errors}
                onTitleChange={(e) => {
                    setCreateRecruitmentStepFormState({
                        ...createRecruitmentStepFormState,
                        title: e.target.value
                    })
                }}
                 errors={createRecruitmentStepFormState.errors}
                onLocationChange={(e) => {
                    setCreateRecruitmentStepFormState({
                        ...createRecruitmentStepFormState,
                        Location: e.target.value
                    })
                }}
                errors={createRecruitmentStepFormState.errors}
                onEmploymentChange={(e) => {
                    setCreateRecruitmentStepFormState({
                        ...createRecruitmentStepFormState,
                        Employment: e.target.value
                    })
                }}
                errors={createRecruitmentStepFormState.errors}
                onWorkplaceChange={(e) => {
                    setCreateRecruitmentStepFormState({
                        ...createRecruitmentStepFormState,
                        Workplace: e.target.value
                    })
                }}
                onDescriptionChange={(e) => {
                    setCreateRecruitmentStepFormState({
                        ...createRecruitmentStepFormState,
                        description: e.target.value
                    })
                }}
                onStageTypeChange={(e) => {
                    setCreateRecruitmentStepFormState({
                        ...createRecruitmentStepFormState,
                        type: e.target.value
                    })
                }}
                selectedStageType={createRecruitmentStepFormState.type}
                stepTitle={createRecruitmentStepFormState.title}
                stepEmployment={createRecruitmentStepFormState.Employment}
                stepLocation={createRecruitmentStepFormState.Location}
                stepWorkplace={createRecruitmentStepFormState.Workplace}
                stepDescription={createRecruitmentStepFormState.description}
            />
            <RecruitmentStepDialog
                show={modifyRecruitmentStepFormState.showModificationDialog}
                title={"Add a new stage to the recruitment process"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setModifyRecruitmentStepFormState({
                                ...modifyRecruitmentStepFormState,
                                showModificationDialog: false
                            })
                        },
                        variant: "secondary"
                    },
                    {
                        title: "Modify stage",
                        handler: modifyRecruitmentStep,
                        variant: "primary"
                    }
                ]}
                errors={modifyRecruitmentStepFormState.errors}
                onTitleChange={(e) => {
                    setModifyRecruitmentStepFormState({
                        ...modifyRecruitmentStepFormState,
                        title: e.target.value
                    })
                }}
                onDescriptionChange={(e) => {
                    setModifyRecruitmentStepFormState({
                        ...modifyRecruitmentStepFormState,
                        description: e.target.value
                    })
                }}
                onStageTypeChange={(e) => {
                    setModifyRecruitmentStepFormState({
                        ...modifyRecruitmentStepFormState,
                        type: e.target.value
                    })
                }}
                selectedStageType={modifyRecruitmentStepFormState.type}
                stepTitle={modifyRecruitmentStepFormState.title}
                stepDescription={modifyRecruitmentStepFormState.description}
            />
            <div className={"page-container"}>
                <div className="role-selection-control">
                    <div className={"role-selection-header"}>
                        <h5>Please select Job posts</h5>
                    </div>
                    <div className={"role-selection-dropdown"}>
                        <div className="input-group input-group-sm">
                            <Dropdown className={"input-group-text"}>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <Filter /> Select Job Role
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        JobRoles.map((jobRole) => {
                                            return (
                                                <Dropdown.Item key={jobRole.ui} onClick={(e) => {
                                                    setRecruitmentProcessState({
                                                        ...recruitmentProcessState,
                                                        recruitmentProcess: RecruitmentPipelineRoleMap[jobRole.server],
                                                        selectedJobRole: jobRole
                                                    })
                                                }} active={recruitmentProcessState.selectedJobRole === jobRole}>
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
                    recruitmentProcessState.recruitmentProcess !== undefined &&
                    <div className={"recruitment-pipeline-detail-container"}>
                        <div className={"recruitment-pipeline-controls container-vcenter-hright"}>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setCreateRecruitmentStepFormState({
                                        ...createRecruitmentStepFormState,
                                        showCreationDialog: true
                                    })
                                }}
                            >
                                Add a new stage
                            </Button>
                        </div>
                        <div className={"recruitment-pipeline-detail"}>
                            {
                                recruitmentProcessState.recruitmentProcess.map((step, index) => {
                                    const lenSteps = recruitmentProcessState.recruitmentProcess.length
                                    return (
                                        <div key={`index-${step.title}`} className={"recruitment-pipeline-step row"}>
                                            <div className={"step-number-container container-all-center col-1"}>
                                                <Button disabled={true} className={"step-number btn btn-circle btn-sm"} variant="primary">{index + 1}</Button>
                                            </div>
                                            <div className={"step-detail-container col-9"}>
                                                <div className={"step-detail"}>
                                                    <div className={'step-title h5'}>{step.title}</div>
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
                                                                    Object.keys(RecruitmentStepType).map((k) => {
                                                                        if (RecruitmentStepType[k].ui === step.type.ui) {
                                                                            stepType = k
                                                                        }
                                                                    })
                                                                    setModifyRecruitmentStepFormState({
                                                                        ...modifyRecruitmentStepFormState,
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
                                                                            handler: () => removeRecruitmentStep(index),
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
                                                    {
                                                        index !== 0 && <div className={"icon-container"}>
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip>Move Job one step up</Tooltip>
                                                                }
                                                            >
                                                                <button type="button" onClick={() => moveStepUp(index)} className="btn btn-circle btn-sm btn-warning">
                                                                    <ArrowBarUp></ArrowBarUp>
                                                                </button>
                                                            </OverlayTrigger>
                                                        </div>
                                                    }
                                                    {
                                                        index !== lenSteps - 1 && <div className={"icon-container"}>
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                overlay={
                                                                    <Tooltip>Move Job one step down</Tooltip>
                                                                }
                                                            >
                                                                <button type="button" onClick={() => moveStepDown(index)} className="btn btn-circle btn-sm btn-warning">
                                                                    <ArrowBarDown></ArrowBarDown>
                                                                </button>
                                                            </OverlayTrigger>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            {
                                                index !== lenSteps - 1 && <div className={"step-detail-footer col-12"}>
                                                    <div className={"connector-arrow-container container-all-center"}>
                                                        <ArrowDown></ArrowDown>
                                                    </div>
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

export default RecruitmentProcess;