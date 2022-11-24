import './ManageRoles.css';
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

const Roles = [
    {
        title: "Software Engineer",
        expectations: "Write and test product or system development code." +
            " Participate in, or lead design reviews with peers and stakeholders" +
            " to decide amongst available technologies. Review code developed by" +
            " other developers and provide feedback to ensure best practices" +
            " (e.g., style guidelines, checking code in, accuracy, testability," +
            " and efficiency). Contribute to existing documentation or educational" +
            " content and adapt content based on product/program updates and user " +
            "feedback. Triage product or system issues and debug/track/resolve" +
            " by analyzing the sources of issues and the impact on hardware, " +
            "network, or service operations and quality.",
        benefits: "Beyond competitive pay, you can receive incentive awards for" +
            " your performance. Other great perks include 401(k) match, stock" +
            " purchase plan, paid maternity and parental leave, PTO, multiple" +
            " health plans, and much more."
    },
    {
        title: "Software Engineer",
        expectations: "Participate in, or lead design reviews with peers and stakeholders" +
            " to decide amongst available technologies ",
        benefits: "Beyond competitive pay, you can receive incentive awards for your performance." +
            " Other great perks include 401(k) match, stock purchase plan, paid maternity and" +
            " parental leave, PTO, multiple health plans, and much more."
    }
]

const Referrals = [
    {
    name: "Kenny Leong",
    email: "kleong2@mail.sfsu.edu",
    title: "Software Engineer",
    description: "Kenny is a half decent frontend engineer and team member. Would kind of recommend."
    }
]

function RoleEditDialog(props) {
    return (
        <Dialog
            show={props.show}
            title={props.title}
            actions={props.actions}
        >
            <div>
                <div className={"role-step-errors"}>
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
                        placeholder="Enter title"
                        value={props.roleTitle}
                        onChange={props.onTitleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Expectations
                    </label>
                    <textarea className="form-control" id="recruitmentStageDescriptionInput"
                        rows="5" placeholder="Enter description"
                        value={props.expectations}
                        onChange={props.onExpectationsChange}
                    >
                    </textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Benefits
                    </label>
                    <textarea className="form-control" id="recruitmentStageDescriptionInput"
                        rows="5" placeholder="Enter description"
                        value={props.benefits}
                        onChange={props.onBenefitsChange}
                    >
                    </textarea>
                </div>
            </div>
        </Dialog>
    )
}

function ReferralEditDialog(props) {
    return (
        <Dialog
            show={props.show}
            title={props.title}
            actions={props.actions}
        >
            <div>
                <div className={"referral-step-errors"}>
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
                        Referee name
                    </label>
                    <input className="form-control" id="recruitmentStageTitleInput"
                        placeholder="First name Last name"
                        value={props.name}
                        onChange={props.onNameChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Referee email
                    </label>
                    <input className="form-control" id="recruitmentStageTitleInput"
                        placeholder="email@example.com"
                        value={props.email}
                        onChange={props.onEmailChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Why this candidate?
                    </label>
                    <textarea className="form-control" id="recruitmentStageDescriptionInput"
                        rows="5" placeholder="Enter referral description"
                        value={props.description}
                        onChange={props.onDescriptionChange}
                    >
                    </textarea>
                </div>
            </div>
        </Dialog>
    )
}

export function ManageRoles() {
    const { SearchBar } = Search;
    const [roles, setRoles] = useState(Roles)
    const [referrals, setReferrals] = useState(Referrals)
    const [editRoleDialogState, setEditRoleDialogState] = useState({
        show: false,
        title: "",
        benefits: "",
        expectations: "",
        errors: [],
        index: undefined
    })

    const [createRoleDialogState, setCreateRoleDialogState] = useState({
        show: false,
        title: "",
        benefits: "",
        expectations: "",
        errors: [],
        index: undefined
    })

    const [editReferralDialogState, setEditReferralDialogState] = useState({
        show: false,
        name: "",
        email: "",
        title:"",
        description: "",
        errors: [],
        index: undefined
    })

    const [createReferralDialogState, setCreateReferralDialogState] = useState({
        show: false,
        name: "",
        email: "",
        title: "",
        description: "",
        errors: [],
        index: undefined
    })

    const appContext = useContext(ApplicationContext);

    const removeRole = (index) => {
        let newRoles = []
        for (let i = 0; i < roles.length; i++) {
            i !== index && newRoles.push(roles[i])
        }
        appContext.closeDialog()
        setRoles(newRoles)
    }

    const createRole = () => {
        let errors = []
        if (!createRoleDialogState.title || createRoleDialogState.title.length === 0) {
            errors.push("Role title cannot be empty")
        }
        if (!createRoleDialogState.expectations || createRoleDialogState.expectations.length === 0) {
            errors.push("Role expectations cannot be empty")
        }
        if (!createRoleDialogState.benefits || createRoleDialogState.benefits.length === 0) {
            errors.push("Role benefits cannot be empty")
        }
        if (errors.length > 0) {
            setCreateRoleDialogState({
                ...createRoleDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            setRoles([
                ...roles,
                {
                    title: createRoleDialogState.title,
                    expectations: createRoleDialogState.expectations,
                    benefits: createRoleDialogState.benefits
                }
            ])
            setCreateRoleDialogState({
                ...createRoleDialogState,
                show: false,
            })
        }
    }

    const removeReferrals = (index) => {
        let newReferrals = []
        for (let i = 0; i < referrals.length; i++) {
            i !== index && newReferrals.push(referrals[i])
        }
        appContext.closeDialog()
        setReferrals(newReferrals)
    }

    const createReferral = () => {
        let errors = []
        if (!createReferralDialogState.name || createReferralDialogState.name.length === 0) {
            errors.push("Referral name cannot be empty")
        }
        if (!createReferralDialogState.email || createReferralDialogState.email.length === 0) {
            errors.push("Referral email cannot be empty")
        }
        if (!createReferralDialogState.title || createReferralDialogState.title.length === 0) {
            errors.push("Referral job title cannot be empty")
        }
        if (!createReferralDialogState.description || createReferralDialogState.description.length === 0) {
            errors.push("Referral description cannot be empty")
        }
        if (errors.length > 0) {
            setCreateReferralDialogState({
                ...createReferralDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            setReferrals([
                ...referrals,
                {
                    name: createReferralDialogState.name,
                    email: createReferralDialogState.email,
                    title: createReferralDialogState.title,
                    description: createReferralDialogState.description
                }
            ])
            setCreateReferralDialogState({
                ...createReferralDialogState,
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
            dataField: 'expectations',
            text: 'Expectations'
        },
        {
            dataField: 'benefits',
            text: 'Benefits'
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
                                setEditRoleDialogState({
                                    ...editRoleDialogState,
                                    show: true,
                                    index: index,
                                    title: row.title,
                                    expectations: row.expectations,
                                    benefits: row.benefits,
                                })
                            }}>Edit</DropdownItem>
                            <DropdownItem onClick={() => {
                                setCreateReferralDialogState({
                                    ...createReferralDialogState,
                                    show: true,
                                    title: row.title,
                                })
                            }}>Referrals</DropdownItem>
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
                                            title: "Remove role",
                                            handler: () => removeRole(index),
                                            variant: "danger"
                                        }
                                    ],
                                    "Once deleted, this can't be undone. Are you sure you want to proceed?"
                                )
                            }}>Delete</DropdownItem>
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

    const handleEditJobRole = () => {
        let errors = []
        if (!editRoleDialogState.title || editRoleDialogState.title.length === 0) {
            errors.push("Role title cannot be empty")
        }
        if (!editRoleDialogState.expectations || editRoleDialogState.expectations.length === 0) {
            errors.push("Role expectations cannot be empty")
        }
        if (!editRoleDialogState.benefits || editRoleDialogState.benefits.length === 0) {
            errors.push("Role benefits cannot be empty")
        }
        if (errors.length > 0) {
            setEditRoleDialogState({
                ...editRoleDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            let newRoles = []
            for (let i = 0; i < roles.length; i++) {
                if (i === editRoleDialogState.index) {
                    newRoles.push({
                        title: editRoleDialogState.title,
                        expectations: editRoleDialogState.expectations,
                        benefits: editRoleDialogState.benefits
                    })
                }
                else {
                    newRoles.push(roles[i])
                }
            }
            setRoles(newRoles)
            setEditRoleDialogState({
                ...editRoleDialogState,
                show: false,
            })
        }
    }

    const handleEditJobReferral = () => {
        let errors = []
        if (!editReferralDialogState.name || editReferralDialogState.name.length === 0) {
            errors.push("Referral name cannot be empty")
        }
        if (!editReferralDialogState.email || editReferralDialogState.email.length === 0) {
            errors.push("Referral email cannot be empty")
        }
        if (!editReferralDialogState.title || editReferralDialogState.title.length === 0) {
            errors.push("Referral job title cannot be empty")
        }
        if (!editReferralDialogState.description || editReferralDialogState.description.length === 0) {
            errors.push("Referral description cannot be empty")
        }
        if (errors.length > 0) {
            setEditReferralDialogState({
                ...editReferralDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            let newReferrals = []
            for (let i = 0; i < referrals.length; i++) {
                if (i === editReferralDialogState.index) {
                    newReferrals.push({
                        name: editReferralDialogState.name,
                        email: editReferralDialogState.email,
                        title: editReferralDialogState.title,
                        description: editReferralDialogState.description
                    })
                }
                else {
                    newReferrals.push(referrals[i])
                }
            }
            setReferrals(newReferrals)
            setEditReferralDialogState({
                ...editReferralDialogState,
                show: false,
            })
        }
    }

    return (
        <div className={"page-container"}>
            <RoleEditDialog
                show={editRoleDialogState.show}
                title={"Edit Role"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setEditRoleDialogState({
                                ...editRoleDialogState,
                                show: false
                            })
                        },
                        variant: "secondary"
                    },
                    {
                        title: "Save",
                        handler: handleEditJobRole,
                        variant: "primary"
                    }
                ]}
                errors={editRoleDialogState.errors}
                onTitleChange={(e) => {
                    setEditRoleDialogState({
                        ...editRoleDialogState,
                        title: e.target.value
                    })
                }}
                onExpectationsChange={(e) => {
                    setEditRoleDialogState({
                        ...editRoleDialogState,
                        expectations: e.target.value
                    })
                }}
                onBenefitsChange={(e) => {
                    setEditRoleDialogState({
                        ...editRoleDialogState,
                        benefits: e.target.value
                    })
                }}
                roleTitle={editRoleDialogState.title}
                expectations={editRoleDialogState.expectations}
                benefits={editRoleDialogState.benefits}
            />
            <RoleEditDialog
                show={createRoleDialogState.show}
                title={"Create Role"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            createRole({
                                ...createRoleDialogState,
                                show: false
                            })
                        },
                        variant: "secondary"
                    },
                    {
                        title: "Create",
                        handler: createRole,
                        variant: "primary"
                    }
                ]}
                errors={createRoleDialogState.errors}
                onTitleChange={(e) => {
                    setCreateRoleDialogState({
                        ...createRoleDialogState,
                        title: e.target.value
                    })
                }}
                onExpectationsChange={(e) => {
                    setCreateRoleDialogState({
                        ...createRoleDialogState,
                        expectations: e.target.value
                    })
                }}
                onBenefitsChange={(e) => {
                    setCreateRoleDialogState({
                        ...createRoleDialogState,
                        benefits: e.target.value
                    })
                }}
                roleTitle={createRoleDialogState.title}
                expectations={createRoleDialogState.expectations}
                benefits={createRoleDialogState.benefits}
            />
            <ReferralEditDialog
                show={createReferralDialogState.show}
                title={"Add Referral"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setCreateReferralDialogState({
                                ...createReferralDialogState,
                                show: false
                            })
                        },
                        variant: "secondary"
                    },
                    {
                        title: "Add Referral",
                        handler: createReferral,
                        variant: "primary"
                    }
                ]}
                errors={createReferralDialogState.errors}
                onNameChange={(e) => {
                    setCreateReferralDialogState({
                        ...createReferralDialogState,
                        name: e.target.value
                    })
                }}
                onEmailChange={(e) => {
                    setCreateReferralDialogState({
                        ...createReferralDialogState,
                        email: e.target.value
                    })
                }}
                onTitleChange={(e) => {
                    setCreateReferralDialogState({
                        ...createReferralDialogState,
                        title: e.target.value
                    })
                }}
                onDescriptionChange={(e) => {
                    setCreateReferralDialogState({
                        ...createReferralDialogState,
                        description: e.target.value
                    })
                }}
                name={createReferralDialogState.name}
                email={createReferralDialogState.email}
                title={"Add Referral: " + createReferralDialogState.title}
                description={createReferralDialogState.description}
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
                                    <Breadcrumb.Item active>Recruitment: Job Roles</Breadcrumb.Item>
                                </Breadcrumb>
                                <h1>Manage Job Roles</h1>

                                <div className={"container-vcenter-hright"}>

                                    <SearchBar {...props.searchProps} />

                                    <Button variant="primary"
                                        onClick={() => {
                                            setCreateRoleDialogState({
                                                ...createRoleDialogState,
                                                show: true
                                            })
                                        }}
                                    >Create Role</Button>
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