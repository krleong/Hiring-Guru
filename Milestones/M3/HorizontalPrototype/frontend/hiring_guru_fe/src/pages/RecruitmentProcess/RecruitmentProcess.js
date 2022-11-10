import './RecruitmentProcess.css';
import Dropdown from "react-bootstrap/Dropdown";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
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

const jobPositions = [
    {
        ui: 'Software Engineer',
        server: 'SOFTWARE_ENGINEER'
    },
    {
        ui: 'CEO',
        server: 'CEO'
    },
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
}

const RecruitmentPipelineSoftwareEngineer = [
    {
        type: RecruitmentStepType.Interview,
        title: "First Technical Interview",
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

const RecruitmentPipelinePositionMap = {
    SOFTWARE_ENGINEER: RecruitmentPipelineSoftwareEngineer,
    CEO: RecruitmentPipelineCEO
}

function RecruitmentStepDialog(props) {
    return (
        <Dialog
            show={props.show}
            title={"Add a new stage to the recruitment process"}
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
                    <label htmlFor="recruitmentStageTitleInput" className="form-label">
                        Title
                    </label>
                    <input className="form-control" id="recruitmentStageTitleInput"
                        placeholder="Enter title ..."
                        value={props.stepTitle}
                        onChange={props.onTitleChange}
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
                <select className="form-select" aria-label="Default select example"
                    value={
                        props.selectedStageType ||
                        "Select the type of this recruitment stage"
                    }
                    onChange={props.onStageTypeChange}
                >
                    <option disabled>Select the type of this recruitment stage</option>
                    {
                        Object.keys(RecruitmentStepType).map((k) => {
                            return <option
                                key={`recruitment-stage-type-select-${k}`}
                                value={k}
                            >{RecruitmentStepType[k].ui}</option>
                        })
                    }
                </select>
            </div>
        </Dialog>
    )
}


function RecruitmentProcess() {
    const appContext = useContext(ApplicationContext);
    const [recruitmentProcessState, setRecruitmentProcessState] = useState({
        selectedjobPosition: jobPositions.All,
        recruitmentProcess: undefined
    })
    const [createRecruitmentStepFormState, setCreateRecruitmentStepFormState] = useState({
        showCreationDialog: false,
        showModificationDialog: false,
        title: "",
        description: "",
        type: undefined,
        errors: [],

    })
    const [modifyRecruitmentStepFormState, setModifyRecruitmentStepFormState] = useState({
        showModificationDialog: false,
        title: "",
        description: "",
        type: undefined,
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
            errors.push("Please provide a description for this stage")
        }
        if (!createRecruitmentStepFormState.type || createRecruitmentStepFormState.type.length === 0) {
            errors.push("Please select the type of this stage")
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
                        detail: createRecruitmentStepFormState.description
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
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard/home">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item active>Recruitment: Hiring Pipeline</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Design Hiring Pipeline</h1>
                <div className="position-selection-control">
                    <div className={"position-selection-header"}>
                        <h5>Select a position to configure its Recruitment Process:</h5>
                    </div>
                    <div className={"position-selection-dropdown"}>
                        <div className="input-group input-group-sm">
                            <Dropdown className={"input-group-text"}>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <Filter /> Select Job Position
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        jobPositions.map((jobPosition) => {
                                            return (
                                                <Dropdown.Item key={jobPosition.ui} onClick={(e) => {
                                                    setRecruitmentProcessState({
                                                        ...recruitmentProcessState,
                                                        recruitmentProcess: RecruitmentPipelinePositionMap[jobPosition.server],
                                                        selectedjobPosition: jobPosition
                                                    })
                                                }} active={recruitmentProcessState.selectedjobPosition === jobPosition}>
                                                    {jobPosition.ui}
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
                                                    <div className={'step-type'}>{step.type.ui}</div>
                                                    <div className={'step-description'}>{step.detail}</div>
                                                </div>
                                            </div>
                                            <div className={"step-actions-container container-all-center col-2"}>
                                                <div className={"step-actions"}>
                                                    <div className={"icon-container"}>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            overlay={
                                                                <Tooltip>Update stage</Tooltip>
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
                                                                <Tooltip>Delete stage</Tooltip>
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
                                                                            title: "Remove stage",
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
                                                                    <Tooltip>Move stage one step up</Tooltip>
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
                                                                    <Tooltip>Move stage one step down</Tooltip>
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