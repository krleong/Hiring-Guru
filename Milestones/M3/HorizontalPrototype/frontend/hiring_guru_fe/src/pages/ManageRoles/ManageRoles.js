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

function RoleEditDialog(props) {
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
                        value={props.roleTitle}
                        onChange={props.onTitleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Benefits
                    </label>
                    <textarea className="form-control" id="recruitmentStageDescriptionInput"
                        rows="5" placeholder="Enter description ..."
                        value={props.benefits}
                        onChange={props.onBenefitsChange}
                    >
                    </textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageDescriptionInput" className="form-label">
                        Expectations
                    </label>
                    <textarea className="form-control" id="recruitmentStageDescriptionInput"
                        rows="5" placeholder="Enter description ..."
                        value={props.expectations}
                        onChange={props.onExpectationsChange}
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
    const [editDialogState, setEditDialogState] = useState({
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
                    expectations: createRoleDialogState.expectations,
                    title: createRoleDialogState.title,
                    benefits: createRoleDialogState.benefits
                }
            ])
            setCreateRoleDialogState({
                ...createRoleDialogState,
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
                                setEditDialogState({
                                    ...editDialogState,
                                    show: true,
                                    index: index,
                                    title: row.title,
                                    benefits: row.benefits,
                                    expectations: row.expectations,
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
                                            title: "Remove role",
                                            handler: () => removeRole(index),
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

    const handleEditRecruitmentStep = () => {
        let errors = []
        if (!editDialogState.title || editDialogState.title.length === 0) {
            errors.push("Role title cannot be empty")
        }
        if (!editDialogState.expectations || editDialogState.expectations.length === 0) {
            errors.push("Role expectations cannot be empty")
        }
        if (!editDialogState.benefits || editDialogState.benefits.length === 0) {
            errors.push("Role benefits cannot be empty")
        }
        if (errors.length > 0) {
            setEditDialogState({
                ...editDialogState,
                show: true,
                errors: errors,
            })
        }
        else {
            let newRoles = []
            for (let i = 0; i < roles.length; i++) {
                if (i === editDialogState.index) {
                    newRoles.push({
                        expectations: editDialogState.expectations,
                        title: editDialogState.title,
                        benefits: editDialogState.benefits
                    })
                }
                else {
                    newRoles.push(roles[i])
                }
            }
            setRoles(newRoles)
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
            <RoleEditDialog
                show={editDialogState.show}
                title={"Edit Role"}
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
                        handler: handleEditRecruitmentStep,
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
                onExpectationsChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        expectations: e.target.value
                    })
                }}
                onBenefitsChange={(e) => {
                    setEditDialogState({
                        ...editDialogState,
                        benefits: e.target.value
                    })
                }}
                roleTitle={editDialogState.title}
                expectations={editDialogState.expectations}
                benefits={editDialogState.benefits}
            />
            <RoleEditDialog
                show={createRoleDialogState.show}
                title={"Create Role"}
                actions={[
                    {
                        title: "Close",
                        handler: () => {
                            setCreateRoleDialogState({
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