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
                        onChange={props.onRoleTitleChange}
                    />
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="recruitmentStageTitleInput" className="form-label">
                        Company
                    </label>
                    <input className="form-control" id="recruitmentStageTitleInput"
                        placeholder="Enter company"
                        value={props.companyTitle}
                        onChange={props.onCompanyTitleChange}
                    />
                </div> */}
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
            // jobId: roles[i].id,
            roleId: roles[i].id,
            companyId: roles[i].company.id,
            // roleTitle: roles[i].role.title,
            companyTitle: roles[i].company.title,
            // expectations: roles[i].role.expectations,
            roleTitle: roles[i].title,
            expectations: roles[i].expectations,
            // benefits: roles[i].role.benefits,
            benefits: roles[i].benefits,
        })
    }
    return parsedRoles
}


export function ManageRoles() {
    const appContext = useContext(ApplicationContext);

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


    const [createRoleDialogState, setCreateRoleDialogState] = useState({
        show: false,
        roleTitle: "",
        // companyTitle: "",
        expectations: "",
        benefits: "",
        errors: [],
        index: undefined
    })

    const [editRoleDialogState, setEditRoleDialogState] = useState({
        show: false,
        roleTitle: "",
        // companyTitle: "",
        expectations: "",
        benefits: "",
        errors: [],
        index: undefined
    })



    const fetchRoles = () => {
        setPageState({
            ...rolePageState,
            listOfRoles: [],
            getRoleListRequestStatus: RolePageStatus.InProgress,
            searchFetchError: ''
        })

        axios({
            // url: `${BASE_URL}/roles/jobs`,
            // TEMP FIX: GET ALL ROLES FOR COMPANY ID 177
            url: `${BASE_URL}/companies/` + 177 + `/roles`,
            method: 'get',
            timeout: 10000,
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
            // TEMP FIX TO MAKE COMPANY ID 177
            // url: `${BASE_URL}/roles/` + rolePageState.listOfRoles[index].roleId + '/jobs/' + rolePageState.listOfRoles[index].jobId,
            url: `${BASE_URL}/companies/` +  177 + `/roles/` + rolePageState.listOfRoles[index].roleId,
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
                    deleteRoleListRequestStatus: RolePageStatus.Error,
                    searchFetchError: 'There was an error deleting the role. Please try again later'
                })
            }
        }).catch((error) => {
            setPageState({
                ...rolePageState,
                listOfRoles: [],
                deleteRoleistRequestStatus: RolePageStatus.Error,
                searchFetchError: 'There was an error deleting the role. Please try again later'
            })
        })

        let newRoles = []
        for (let i = 0; i < rolePageState.listOfRoles.length; i++) {
            i !== index && newRoles.push(rolePageState.listOfRoles[i])
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
        // if (!createRoleDialogState.companyTitle || createRoleDialogState.companyTitle.length === 0) {
        //     errors.push("Company title cannot be empty")
        // }
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
                /*PROBLEM - NEEDS TO MATCH A PRE-EXISTING ROLE (THE STATE OF THAT), CAN'T GRAB WHAT DOESN'T EXIST YET - SO DO ROLE FIRST?*/
                // url: `${BASE_URL}/companies/` + rolePageState.listOfRoles[createRoleDialogState.index].companyId + '/roles/' + rolePageState.listOfRoles[createRoleDialogState.index].roleId,
                /*TEMP FIX: ASSUME COMPANYID IS '177'*/
                url: `${BASE_URL}/companies/` + 177 + '/roles',
                method: 'post',
                timeout: 10000,
                data: {
                    title: createRoleDialogState.roleTitle,
                    // companyTitle: createRoleDialogState.companyTitle,
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
                    postRoleListRequestStatus: RolePageStatus.Error,
                    searchFetchError: 'There was an error adding to the list of roles. Please try again later'
                })
            })

            setPageState({
                ...rolePageState,
                listOfRoles: [
                    ...rolePageState.listOfRoles,
                    {
                        roleTitle: createRoleDialogState.roleTitle,
                        // companyTitle: createRoleDialogState.companyTitle,
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
                                    roleTitle: row.roleTitle,
                                    // companyTitle: row.companyTitle,
                                    expectations: row.expectations,
                                    benefits: row.benefits,
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
        // if (!editRoleDialogState.companyTitle || editRoleDialogState.companyTitle.length === 0) {
        //     errors.push("Company title cannot be empty")
        // }
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
                url: `${BASE_URL}/companies/` + rolePageState.listOfRoles[editRoleDialogState.index].companyId + '/roles/' + rolePageState.listOfRoles[editRoleDialogState.index].roleId,
                method: 'patch',
                timeout: 10000,
                data: {
                    roleTitle: editRoleDialogState.roleTitle,
                    // companyTitle: editRoleDialogState.companyTitle,
                    expectations: editRoleDialogState.expectations,
                    benefits: editRoleDialogState.benefits,
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
                        // companyTitle: editRoleDialogState.companyTitle,
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
                        // companyTitle: editRoleDialogState.companyTitle,
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
                onRoleTitleChange={(e) => {
                    setEditRoleDialogState({
                        ...editRoleDialogState,
                        roleTitle: e.target.value
                    })
                }}
                // onCompanyTitleChange={(e) => {
                //     setEditRoleDialogState({
                //         ...editRoleDialogState,
                //         companyroleTitle: e.target.value
                //     })
                // }}
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
                // companyTitle={editRoleDialogState.companyTitle}
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
                onRoleTitleChange={(e) => {
                    setCreateRoleDialogState({
                        ...createRoleDialogState,
                        roleTitle: e.target.value
                    })
                }}
                // onCompanyTitleChange={(e) => {
                //     setCreateRoleDialogState({
                //         ...createRoleDialogState,
                //         companyroleTitle: e.target.value
                //     })
                // }}
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
                // companyTitle={createRoleDialogState.companyTitle}
                expectations={createRoleDialogState.expectations}
                benefits={createRoleDialogState.benefits}
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
                                    <Breadcrumb.Item active>Open Positions: Job Roles</Breadcrumb.Item>
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