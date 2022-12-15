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
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { ApplicationContext } from "../../HiringGuru";
import { Dialog } from "../../components/Dialog/Dialog";
import axios from "axios";
import { BASE_URL } from "../../components/configuration";

// const jobRoles = [
//     {
//         ui: 'Software Engineer',
//         server: 'SOFTWARE_ENGINEER'
//     },
//     {
//         ui: 'CEO',
//         server: 'CEO'
//     },
// ]

const RecruitmentStepType = {
    Interview: {
        ui: 'Interview',
        server: 'Interview'
    },
    ProgrammingTest: {
        ui: 'Programming Test',
        server: 'ProgrammingTest'
    },
}

// const RecruitmentPipelineSoftwareEngineer = [
//     {
//         type: RecruitmentStepType.Interview,
//         title: "First Technical Interview",
//         description: "First interview should be with a Software Engineer. It should cover basic" +
//             " concepts like OOP, DS and Problem Solving."
//     },
//     {
//         type: RecruitmentStepType.Interview,
//         title: "Second Technical Interview",
//         description: "First interview should be with a Software Engineer. It should cover advanced" +
//             " aspects like Algorithms, Design and Networks."
//     },
//     {
//         type: RecruitmentStepType.ProgrammingTest,
//         title: "HackerRank Test",
//         description: "First interview should be with a Software Engineer. It should cover all" +
//             " the technical aspects like OOP, DB, DS, Algorithms and Networks."
//     },
//     {
//         type: RecruitmentStepType.Interview,
//         title: "HR Interview",
//         description: "HR Interview should cover discussion about personality and salary package."
//     },
// ]

// const RecruitmentPipelineCEO = [
//     {
//         type: RecruitmentStepType.Interview,
//         title: "Interview Evaluation",
//         description: "Interview with the founder to discuss past experience and assess personality traits."
//     },
//     {
//         type: RecruitmentStepType.Interview,
//         title: "HR Interview",
//         description: "HR Interview should cover discussion about personality and salary package."
//     },
// ]

// const RecruitmentPipelinePositionMap = {
//     SOFTWARE_ENGINEER: RecruitmentPipelineSoftwareEngineer,
//     CEO: RecruitmentPipelineCEO
// }

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

const RecruitmentStepFetchStatus = {
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

const parseRecruitmentSteps = (recruitmentSteps) => {
    let parsedRecruitmentSteps = []
    for (let i = 0; i < recruitmentSteps.length; i++) {
        parsedRecruitmentSteps.push({
            id: recruitmentSteps[i].id,
            title: recruitmentSteps[i].title,
            type: recruitmentSteps[i].type,
            description: recruitmentSteps[i].description,
            index: recruitmentSteps[i].index,
        })
    }
    return parsedRecruitmentSteps
}

function RecruitmentProcess() {
    const appContext = useContext(ApplicationContext);

    const [recruitmentProcessPageState, setrecruitmentProcessPageState] = useState({
        recruitmentProcess: [],
        listOfRoles:[],
        selectedRoleId: undefined,
        // recruitmentProcess: undefined,
        getRecruitmentStepRequestStatus: RecruitmentStepFetchStatus.NotStarted,
        recruitmentStepFetchError: '',
        searchString: '',
        getRolesListRequestStatus: RolesFetchStatus.NotStarted,
        searchFetchError: '',
    })

    useEffect(() => {
        if (recruitmentProcessPageState.selectedRoleId) {
            fetchRecruitmentSteps(recruitmentProcessPageState.selectedRoleId)
        } else {
            fetchRoles()
        }
    }, [recruitmentProcessPageState.selectedRoleId]);

    const [createRecruitmentStepFromState, setCreateRecruitmentStepFromState] = useState({
        showCreationDialog: false,
        showModificationDialog: false,
        title: "",
        description: "",
        type: undefined,
        errors: []

    })
    const [modifyRecruitmentStepFromState, setModifyRecruitmentStepFromState] = useState({
        showModificationDialog: false,
        title: "",
        description: "",
        type: undefined,
        errors: [],
        index: undefined
    })

    const fetchRecruitmentSteps = () => {
    
        setrecruitmentProcessPageState({
            ...recruitmentProcessPageState,
            recruitmentProcess: [],
            getRecruitmentStepsListRequestStatus: RecruitmentStepFetchStatus.InProgress,
            searchFetchError: ''
        })
        axios({
            url: `${BASE_URL}/api/v1/roles/${recruitmentProcessPageState.selectedRoleId}/hiring-process/stages`,
            method: 'get',
            timeout: 10000,
        }).then((resp) => {
            if (resp.status === 200) {
                setrecruitmentProcessPageState({
                    ...recruitmentProcessPageState,
                    recruitmentProcess: parseRecruitmentSteps(resp.data),
                    getRecruitmentStepsListRequestStatus: RecruitmentStepFetchStatus.Success,
                })
            }
            else {
                setrecruitmentProcessPageState({
                    ...recruitmentProcessPageState,
                    recruitmentProcess: [],
                    getRecruitmentStepsListRequestStatus: RecruitmentStepFetchStatus.Error,
                    searchFetchError: 'There was an error fetching the list of recruitment steps. Please try again later'
                })
            }
        }).catch((error) => {
            setrecruitmentProcessPageState({
                ...recruitmentProcessPageState,
                recruitmentProcess: [],
                getRecruitmentStepsListRequestStatus: RecruitmentStepFetchStatus.Error,
                searchFetchError: 'There was an error fetching the list of recruitment steps. Please try again later'
            })
        })
    }

    const fetchRoles = () => {
        setrecruitmentProcessPageState({
            ...recruitmentProcessPageState,
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
                setrecruitmentProcessPageState({
                    ...recruitmentProcessPageState,
                    listOfRoles: resp.data,
                    getRolesListRequestStatus: RolesFetchStatus.Success,
                })
            }
            else {
                setrecruitmentProcessPageState({
                    ...recruitmentProcessPageState,
                    listOfRoles: [],
                    getRolesListRequestStatus: RolesFetchStatus.Error,
                    rolesFetchError: 'There was an error fetching the list of roles. Please try again later'
                })
            }
        }).catch((error) => {
            setrecruitmentProcessPageState({
                ...recruitmentProcessPageState,
                listOfRoles: [],
                getRolesListRequestStatus: RolesFetchStatus.Error,
                rolesFetchError: 'There was an error fetching the list of roles. Please try again later'
            })
        })
    }

    const moveStepUp = (index) => {
        console.log("Moving step up")
        let process = recruitmentProcessPageState.recruitmentProcess
        const saveState = process[index - 1]
        process[index - 1] = process[index]
        process[index] = saveState
        setrecruitmentProcessPageState({
            ...recruitmentProcessPageState,
            recruitmentProcess: process
        })
    }
    const moveStepDown = (index) => {
        console.log("Moving step down")
        let process = recruitmentProcessPageState.recruitmentProcess
        const saveState = process[index + 1]
        process[index + 1] = process[index]
        process[index] = saveState
        setrecruitmentProcessPageState({
            ...recruitmentProcessPageState,
            ...recruitmentProcessPageState,
            recruitmentProcess: process
        })
    }

    const modifyRecruitmentStep = () => {
        console.log("Running")
        axios({
            url: `${BASE_URL}/api/v1/roles/${recruitmentProcessPageState.selectedRoleId}/hiring-process/stages/${recruitmentProcessPageState.recruitmentProcess[modifyRecruitmentStepFromState.index].id}`,
            method: 'patch',
            timeout: 10000,
            data: {
                title: modifyRecruitmentStepFromState.title,                
                description: modifyRecruitmentStepFromState.description,
                type: modifyRecruitmentStepFromState.type,
                index: modifyRecruitmentStepFromState.index,
            }
        }).then((resp) => {
            if (resp.status === 200) {
                fetchRecruitmentSteps()
            }
            else {
                setrecruitmentProcessPageState({
                    ...recruitmentProcessPageState,
                    recruitmentProcess: [],
                    patchRecruitmentStepsListRequestStatus: RecruitmentStepFetchStatus.Error,
                    searchFetchError: 'There was an error updating the list of recruitment steps. Please try again later'
                })
            }
        }).catch((error) => {
            setrecruitmentProcessPageState({
                ...recruitmentProcessPageState,
                recruitmentProcess: [],
                patchRecruitmentStepsListRequestStatus: RecruitmentStepFetchStatus.Error,
                searchFetchError: 'There was an error updating the list of recruitment steps. Please try again later'
            })
        })

        setModifyRecruitmentStepFromState({
            ...recruitmentProcessPageState,
            recruitmentProcess: [
                ...recruitmentProcessPageState.recruitmentProcess,
                {
                    title: modifyRecruitmentStepFromState.title,                
                    description: modifyRecruitmentStepFromState.description,
                    // type: modifyRecruitmentStepFromState.type,
                    index: modifyRecruitmentStepFromState.index,
                }
            ],
        })
        setModifyRecruitmentStepFromState({
            ...modifyRecruitmentStepFromState,
            show: false,
        })

        let newSteps = []
        for (let i = 0; i < recruitmentProcessPageState.recruitmentProcess.length; i++) {
            if (i === modifyRecruitmentStepFromState.index) {
                newSteps.push({
                    type: RecruitmentStepType[modifyRecruitmentStepFromState.type],
                    title: modifyRecruitmentStepFromState.title,
                    description: modifyRecruitmentStepFromState.description
                })
            }
            else {
                newSteps.push(recruitmentProcessPageState.recruitmentProcess[i])
            }
        }
        setModifyRecruitmentStepFromState({
            ...modifyRecruitmentStepFromState,
            showModificationDialog: false
        })
        setrecruitmentProcessPageState({
            ...recruitmentProcessPageState,
            recruitmentProcess: newSteps
        })
    }

    const createRecruitmentStep = () => {
        let errors = []
        if (!createRecruitmentStepFromState.title || createRecruitmentStepFromState.title.length === 0) {
            errors.push("Please provide a title for this stage")
        }
        if (!createRecruitmentStepFromState.description || createRecruitmentStepFromState.description.length === 0) {
            errors.push("Please provide a description for this stage")
        }
        if (!createRecruitmentStepFromState.type || createRecruitmentStepFromState.type.length === 0) {
            errors.push("Please select the type of this stage")
        }
        if (errors.length > 0) {
            setCreateRecruitmentStepFromState({
                ...createRecruitmentStepFromState,
                showCreationDialog: true,
                errors: errors,
            })
        }
        else {
            axios({
                url: `${BASE_URL}/api/v1/roles/${recruitmentProcessPageState.selectedRoleId}/hiring-process/stages`,
                method: 'post',
                timeout: 10000,
                data: {
                    title: createRecruitmentStepFromState.title,
                    description: createRecruitmentStepFromState.description,
                    type: createRecruitmentStepFromState.type,
                }
            }).then((resp) => {
                if (resp.status === 200) {
                    fetchRecruitmentSteps(recruitmentProcessPageState.selectedRoleId)
                }
                else {
                    setrecruitmentProcessPageState({
                        ...recruitmentProcessPageState,
                        recruitmentProcess: [],
                        postRecruitmentStepsListRequestStatus: RecruitmentStepFetchStatus.Error,
                        searchFetchError: 'There was an error adding to the recruitment process. Please try again later'
                    })
                }
            }).catch((error) => {
                setrecruitmentProcessPageState({
                    ...recruitmentProcessPageState,
                    recruitmentProcess: [],
                    postRecruitmentStepsListRequestStatus: RecruitmentStepFetchStatus.Error,
                    searchFetchError: 'There was an error adding to the recruitment process. Please try again later'
                })
            })
            
            setCreateRecruitmentStepFromState({
                ...createRecruitmentStepFromState,
                showCreationDialog: false
            })
            setrecruitmentProcessPageState({
                ...recruitmentProcessPageState,
                recruitmentProcess: [
                    ...recruitmentProcessPageState.recruitmentProcess,
                    {
                        type: RecruitmentStepType[createRecruitmentStepFromState.type],
                        title: createRecruitmentStepFromState.title,
                        description: createRecruitmentStepFromState.description,
                    }
                ]
            })
        }
    }

    const removeRecruitmentStep = (index) => {
        axios({
            url: `${BASE_URL}/api/v1/roles/${recruitmentProcessPageState.selectedRoleId}/hiring-process/stages/${recruitmentProcessPageState.recruitmentProcess[index].id}`,
            method: 'delete',
            timeout: 10000,
        }).then((resp) => {
            if (resp.status === 200) {
                fetchRecruitmentSteps(recruitmentProcessPageState.selectedRoleId)
            }
            else {
                setrecruitmentProcessPageState({
                    ...recruitmentProcessPageState,
                    recruitmentProcess: [],
                    deleteRecruitmentStepsListRequestStatus: RecruitmentStepFetchStatus.Error,
                    searchFetchError: 'There was an error deleting the recruitment step. Please try again later'
                })
            }
        }).catch((error) => {
            setrecruitmentProcessPageState({
                ...recruitmentProcessPageState,
                recruitmentProcess: [],
                deleteRecruitmentStepsListRequestStatus: RecruitmentStepFetchStatus.Error,
                searchFetchError: 'There was an error deleting the recruitment step. Please try again later'
            })
        })

        let newSteps = []
        for (let i = 0; i < recruitmentProcessPageState.recruitmentProcess.length; i++) {
            i !== index && newSteps.push(recruitmentProcessPageState.recruitmentProcess[i])
        }
        appContext.closeDialog()
        setrecruitmentProcessPageState({
            ...recruitmentProcessPageState,
            recruitmentProcess: newSteps
        })
    }
    return (
        <div>
            <RecruitmentStepDialog
                show={createRecruitmentStepFromState.showCreationDialog}
                title={"Add a new stage to the recruitment process"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setCreateRecruitmentStepFromState({
                                ...createRecruitmentStepFromState,
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
                errors={createRecruitmentStepFromState.errors}
                onTitleChange={(e) => {
                    setCreateRecruitmentStepFromState({
                        ...createRecruitmentStepFromState,
                        title: e.target.value
                    })
                }}
                onDescriptionChange={(e) => {
                    setCreateRecruitmentStepFromState({
                        ...createRecruitmentStepFromState,
                        description: e.target.value
                    })
                }}
                onStageTypeChange={(e) => {
                    setCreateRecruitmentStepFromState({
                        ...createRecruitmentStepFromState,
                        type: e.target.value
                    })
                }}
                selectedStageType={createRecruitmentStepFromState.type}
                stepTitle={createRecruitmentStepFromState.title}
                stepDescription={createRecruitmentStepFromState.description}
            />
            <RecruitmentStepDialog
                show={modifyRecruitmentStepFromState.showModificationDialog}
                title={"Add a new stage to the recruitment process"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setModifyRecruitmentStepFromState({
                                ...modifyRecruitmentStepFromState,
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
                errors={modifyRecruitmentStepFromState.errors}
                onTitleChange={(e) => {
                    setModifyRecruitmentStepFromState({
                        ...modifyRecruitmentStepFromState,
                        title: e.target.value
                    })
                }}
                onDescriptionChange={(e) => {
                    setModifyRecruitmentStepFromState({
                        ...modifyRecruitmentStepFromState,
                        description: e.target.value
                    })
                }}
                onStageTypeChange={(e) => {
                    setModifyRecruitmentStepFromState({
                        ...modifyRecruitmentStepFromState,
                        type: e.target.value
                    })
                }}
                selectedStageType={modifyRecruitmentStepFromState.type}
                stepTitle={modifyRecruitmentStepFromState.title}
                stepDescription={modifyRecruitmentStepFromState.description}
            />
            <div className={"page-container"}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard/home">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item active>Recruitment: Hiring Pipeline</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Design Hiring Pipeline</h1>
                <div className="role-selection-control">
                    <div className={"role-selection-header"}>
                        <h5>Select a role to configure its Recruitment Process:</h5>
                    </div>
                    <div className={"role-selection-dropdown"}>
                        <div className="input-group input-group-sm">
                            <Dropdown className={"input-group-text"}>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <Filter /> Select Job Role
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        recruitmentProcessPageState.listOfRoles.map((role) => {
                                            return (
                                                <Dropdown.Item key={role.id} onClick={(e) => {
                                                    setrecruitmentProcessPageState({
                                                        ...recruitmentProcessPageState,
                                                        selectedRoleId: role.id
                                                    })
                                                }} active={recruitmentProcessPageState.selectedRoleId === role.id}>
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
                {
                    recruitmentProcessPageState.recruitmentProcess !== undefined &&
                    <div className={"recruitment-pipeline-description-container"}>
                        <div className={"recruitment-pipeline-controls container-vcenter-hright"}>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setCreateRecruitmentStepFromState({
                                        ...createRecruitmentStepFromState,
                                        showCreationDialog: true
                                    })
                                }}
                            >
                                Add a new stage
                            </Button>
                        </div>
                        <div className={"recruitment-pipeline-description"}>
                            {
                                recruitmentProcessPageState.recruitmentProcess.map((step, index) => {
                                    const lenSteps = recruitmentProcessPageState.recruitmentProcess.length
                                    return (
                                        <div key={`index-${step.title}`} className={"recruitment-pipeline-step row"}>
                                            <div className={"step-number-container container-all-center col-1"}>
                                                <Button disabled={true} className={"step-number btn btn-circle btn-sm"} variant="primary">{index + 1}</Button>
                                            </div>
                                            <div className={"step-description-container col-9"}>
                                                <div className={"step-description"}>
                                                    <div className={'step-title h5'}>{step.title}</div>
                                                    {/* <div className={'step-type'}>{step.type.ui}</div> */}
                                                    <div className={'step-type'}>{step.type.toString()}</div>
                                                    <div className={'step-description'}>{step.description}</div>
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
                                                                    setModifyRecruitmentStepFromState({
                                                                        ...modifyRecruitmentStepFromState,
                                                                        title: step.title,
                                                                        description: step.description,
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
                                                index !== lenSteps - 1 && <div className={"step-description-footer col-12"}>
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