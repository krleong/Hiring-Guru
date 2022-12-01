import './ManageRoles.css';
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

// REMOVE THIS WHEN BACKEND API IS IMPLEMENTED
// const Roles = [
//     {
//         title: "Software Engineer",
//         expectations: "Write and test product or system development code." +
//             " Participate in, or lead design reviews with peers and stakeholders" +
//             " to decide amongst available technologies. Review code developed by" +
//             " other developers and provide feedback to ensure best practices" +
//             " (e.g., style guidelines, checking code in, accuracy, testability," +
//             " and efficiency). Contribute to existing documentation or educational" +
//             " content and adapt content based on product/program updates and user " +
//             "feedback. Triage product or system issues and debug/track/resolve" +
//             " by analyzing the sources of issues and the impact on hardware, " +
//             "network, or service operations and quality.",
//         benefits: "Beyond competitive pay, you can receive incentive awards for" +
//             " your performance. Other great perks include 401(k) match, stock" +
//             " purchase plan, paid maternity and parental leave, PTO, multiple" +
//             " health plans, and much more."
//     },
//     {
//         title: "Software Engineer",
//         expectations: "Participate in, or lead design reviews with peers and stakeholders" +
//             " to decide amongst available technologies ",
//         benefits: "Beyond competitive pay, you can receive incentive awards for your performance." +
//             " Other great perks include 401(k) match, stock purchase plan, paid maternity and" +
//             " parental leave, PTO, multiple health plans, and much more."
//     }
// ]

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
                        placeholder="Enter role"
                        value={props.roleTitle}
                        onChange={props.onTitleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recruitmentStageTitleInput" className="form-label">
                        Company
                    </label>
                    <input className="form-control" id="recruitmentStageTitleInput"
                        placeholder="Enter company"
                        value={props.companyTitle}
                        onChange={props.onCompanyTitleChange}
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

const RolePageStatus = {
    NotStarted: "NotStarted",
    InProgress: "InProgress",
    Error: "Error",
    Success: "Success",
}

const parseRoles = (roles) => {
    let parsedRoles = []
    for (let i = 0; i < roles.length; i++) {
        parsedRoles.push({
            roleId: roles[i].id,
            companyId: roles[i].company.id,
            roleTitle: roles[i].title,
            companyTitle: roles[i].company.title,
            expectations: roles[i].expectations,
            benefits: roles[i].benefits,
        })
    }
    return parsedRoles
}


export function ManageRoles() {
    const [rolePageState, setPageState] = useState({
        listOfRoles: [],
        searchString: '',
        getRoleListRequestStatus: RolePageStatus.NotStarted,
        searchFetchError: '',
    })

    const { SearchBar } = Search;

    useEffect(() => {
        fetchRoles()
    }, []);

    const [referrals, setReferrals] = useState(Referrals)

    const [createRoleDialogState, setCreateRoleDialogState] = useState({
        show: false,
        roleTitle: "",
        companyTitle: "",
        expectations: "",
        benefits: "",
        errors: [],
        index: undefined
    })

    const [editRoleDialogState, setEditRoleDialogState] = useState({
        show: false,
        roleTitle: "",
        companyTitle: "",
        expectations: "",
        benefits: "",
        errors: [],
        index: undefined
    })

    const [editReferralDialogState, setEditReferralDialogState] = useState({
        show: false,
        name: "",
        email: "",
        title: "",
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

    const fetchRoles = () => {
        setPageState({
            ...rolePageState,
            listOfRoles: [],
            getRoleListRequestStatus: RolePageStatus.InProgress,
            searchFetchError: ''
        })

        axios({
            // url: `${BASE_URL}companies/` + companyId + '/roles',
            url: `${BASE_URL}/companies/` + '177' + '/roles',
            method: 'get',
            timeout: 10000,
            params: {
                query: rolePageState.searchString,
            }
        }).then((resp) => {
            if (resp.status === 200) {
                setPageState({
                    ...rolePageState,
                    listOfRoles: parseRoles(resp.data),
                    getRoleListRequestStatus: RolePageStatus.Success,
                })
            }
            else {
                setPageState({
                    ...rolePageState,
                    listOfRoles: [],
                    getRoleListRequestStatus: RolePageStatus.Error,
                    searchFetchError: 'There was an error fetching the list of roles. Please try again later'
                })
            }
        }).catch((error) => {
            setPageState({
                ...rolePageState,
                listOfRoles: [],
                getRoleListRequestStatus: RolePageStatus.Error,
                searchFetchError: 'There was an error fetching the list of roles. Please try again later'
            })
        })
    }

    const removeRole = (index) => {
        axios({
            url: `${BASE_URL}/roles/` + rolePageState.listOfRoles[editRoleDialogState.index].roleId + '/jobs/' + rolePageState.listOfRoles[editRoleDialogState.index].jobId,
            method: 'delete',
            timeout: 10000,
        }).then((resp) => {
            if (resp.status === 200) {
                fetchRoles()
            }
            else {
                setPageState({
                    ...rolePageState,
                    listOfRoles: [],
                    deleteJobListRequestStatus: RolePageStatus.Error,
                    searchFetchError: 'There was an error deleting the role. Please try again later'
                })
            }
        }).catch((error) => {
            setPageState({
                ...rolePageState,
                listOfRoles: [],
                deleteJobListRequestStatus: RolePageStatus.Error,
                searchFetchError: 'There was an error deleting the role. Please try again later'
            })
        })

        let newRoles = []
        for (let i = 0; i < rolePageState.listOfRoles.length; i++) {
            i !== index && newRoles.push(rolePageState.listOfRoles.roles[i])
        }
        appContext.closeDialog()
        setPageState({
            ...rolePageState,
            listOfRoles: newRoles
        })
    }

    const createRole = (index) => {
        let errors = []
        if (!createRoleDialogState.roleTitle || createRoleDialogState.roleTitle.length === 0) {
            errors.push("Role title cannot be empty")
        }
        if (!createRoleDialogState.companyTitle || createRoleDialogState.companyTitle.length === 0) {
            errors.push("Company title cannot be empty")
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
            axios({
                url: `${BASE_URL}/roles/` + rolePageState.listOfRoles[index].roleId + '/jobs/',
                method: 'post',
                timeout: 10000,
                data: {
                    roleTitle: createRoleDialogState.roleTitle,
                    companyTitle: createRoleDialogState.companyTitle,
                    expectations: createRoleDialogState.expectations,
                    benefits: createRoleDialogState.benefits,
                }
            }).then((resp) => {
                if (resp.status === 200) {
                    fetchRoles()
                }
                else {
                    setPageState({
                        ...rolePageState,
                        listOfRoles: [],
                        postRoleListRequestStatus: RolePageStatus.Error,
                        searchFetchError: 'There was an error adding to the list of roles. Please try again later'
                    })
                }
            }).catch((error) => {
                setPageState({
                    ...rolePageState,
                    listOfRoles: [],
                    postJobListRequestStatus: RolePageStatus.Error,
                    searchFetchError: 'There was an error adding to the list of roles. Please try again later'
                })
            })

            setPageState({
                ...rolePageState,
                listOfRoles: [
                    ...rolePageState.listOfRoles,
                    {
                        roleTitle: createRoleDialogState.roleTitle,
                        companyTitle: createRoleDialogState.companyTitle,
                        expectations: createRoleDialogState.expectations,
                        benefits: createRoleDialogState.benefits,
                    }
                ],
            })
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
            dataField: 'roleTitle',
            text: 'Title'
        },
        {
            dataField: 'companyTitle',
            text: 'Company'
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
                                    roleTitle: row.title,
                                    companyTitle: row.companyTitle,
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
        if (!editRoleDialogState.roleTitle || editRoleDialogState.roleTitle.length === 0) {
            errors.push("Role title cannot be empty")
        }
        if (!editRoleDialogState.companyTitle || editRoleDialogState.companyTitle.length === 0) {
            errors.push("Company title cannot be empty")
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
            axios({
                url: `${BASE_URL}/roles/` + rolePageState.listOfRoles[editRoleDialogState.index].roleId + '/jobs/' + rolePageState.listOfRoles[editRoleDialogState.index].jobId,
                method: 'patch',
                timeout: 10000,
                data: {
                    roleTitle: createRoleDialogState.roleTitle,
                    companyTitle: createRoleDialogState.companyTitle,
                    expectations: createRoleDialogState.expectations,
                    benefits: createRoleDialogState.benefits,
                }
            }).then((resp) => {
                if (resp.status === 200) {
                    fetchRoles()
                }
                else {
                    setPageState({
                        ...rolePageState,
                        listOfRoles: [],
                        patchRoleListRequestStatus: RolePageStatus.Error,
                        searchFetchError: 'There was an error updating the list of roles. Please try again later'
                    })
                }
            }).catch((error) => {
                setPageState({
                    ...rolePageState,
                    listOfRoles: [],
                    patchRoleListRequestStatus: RolePageStatus.Error,
                    searchFetchError: 'There was an error updating the list of roles. Please try again later'
                })
            })

            setPageState({
                ...rolePageState,
                listOfRoles: [
                    ...rolePageState.listOfRoles,
                    {
                        roleTitle: editRoleDialogState.roleTitle,
                        companyTitle: editRoleDialogState.companyTitle,
                        expectations: editRoleDialogState.expectations,
                        benefits: editRoleDialogState.benefits,
                    }
                ],
            })
            setEditRoleDialogState({
                ...editRoleDialogState,
                show: false,
            })

            let newRoles = []
            for (let i = 0; i < rolePageState.listOfRoles.length; i++) {
                if (i === editRoleDialogState.index) {
                    newRoles.push({
                        roleTitle: editRoleDialogState.roleTitle,
                        companyTitle: editRoleDialogState.companyTitle,
                        expectations: editRoleDialogState.expectations,
                        benefits: editRoleDialogState.benefits,
                    })
                }
                else {
                    newRoles.push(rolePageState.listOfRoles[i])
                }
            }
            setPageState({
                ...rolePageState,
                listOfRoles: newRoles
            })
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
                        roleTitle: e.target.value
                    })
                }}
                onCompanyTitleChange={(e) => {
                    setEditRoleDialogState({
                        ...editRoleDialogState,
                        companyTitle: e.target.value
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
                roleTitle={editRoleDialogState.roleTitle}
                companyTitle={editRoleDialogState.companyTitle}
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
                        roleTitle: e.target.value
                    })
                }}
                onCompanyTitleChange={(e) => {
                    setCreateRoleDialogState({
                        ...createRoleDialogState,
                        companyTitle: e.target.value
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
                roleTitle={createRoleDialogState.roleTitle}
                companyTitle={createRoleDialogState.companyTitle}
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
                refTitle={"Add Referral: " + createReferralDialogState.title}
                description={createReferralDialogState.description}
            />
            <div>
                <ToolkitProvider
                    keyField="id"
                    data={rolePageState.listOfRoles}
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