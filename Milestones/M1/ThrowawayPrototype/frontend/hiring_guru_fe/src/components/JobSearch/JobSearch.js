import './JobSearch.css';
import { useState } from "react";
import { Filter, BoxArrowUpRight, HeartFill } from 'react-bootstrap-icons';
import axios from "axios";
import { BASE_URL } from "../configuration";
import Dropdown from 'react-bootstrap/Dropdown';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const JobSearchStatus = {
    NotStarted: "NotStarted",
    InProgress: "InProgress",
    Error: "Error",
    Success: "Success",
}

const JobType = {
    All: {
        ui: 'All',
        server: 'ALL'
    },
    FullTime: {
        ui: 'Full Time',
        server: 'FULL_TIME'
    },
    PartTime: {
        ui: 'Part Time',
        server: 'PART_TIME'
    },
}

const filterJobs = (jobs, keyword, type) => {
    keyword = keyword.toUpperCase()
    let filteredOnType = []
    let finalFiltered = []
    debugger
    if (type == JobType.All.server) {
        filteredOnType = jobs
    } else {
        jobs.forEach((job) => {
            if (job.type == type) {
                filteredOnType.push(job)
            }
        })
    }
    filteredOnType.forEach((job) => {
        if (
            job.title.toUpperCase().includes(keyword) ||
            job.description.toUpperCase().includes(keyword) ||
            job.location.toUpperCase().includes(keyword) ||
            job.company.title.toUpperCase().includes(keyword)
        ) {
            finalFiltered.push(job)
        }
    })
    return finalFiltered
}


function JobSearch() {
    const [searchState, setSearchState] = useState({
        listOfJobs: [],
        searchString: '',
        searchStatus: JobSearchStatus.NotStarted,
        searchFetchError: '',
        selectedJobType: JobType.All
    })
    const initiateSearch = () => {
        setSearchState({
            ...searchState,
            listOfJobs: [],
            searchStatus: JobSearchStatus.InProgress,
            searchFetchError: ''
        })
        axios({
            url: `${BASE_URL}/jobs`,
            method: 'get',
            timeout: 10000,
            params: {
                query: searchState.searchString,
                type: searchState.selectedJobType.server
            }
        }).then((resp) => {
            if (resp.status === 200) {
                setSearchState({
                    ...searchState,
                    listOfJobs: filterJobs(resp.data, searchState.searchString, searchState.selectedJobType.server),
                    searchStatus: JobSearchStatus.Success,
                })
            }
            else {
                setSearchState({
                    ...searchState,
                    listOfJobs: [],
                    searchStatus: JobSearchStatus.Error,
                    searchFetchError: 'There was an error fetching the list of jobs. Please try again later'
                })
            }
        }).catch((error) => {
            setSearchState({
                ...searchState,
                listOfJobs: [],
                searchStatus: JobSearchStatus.Error,
                searchFetchError: 'There was an error fetching the list of jobs. Please try again later'
            })
        })
    }
    return (
        <div className='job-search-component'>
            <div className={'job-search-field-container'}>
                <div></div>
                <div className={'search-field fluid-container'}>
                    <div className="input-group input-group-lg">
                        <Dropdown className={"input-group-text"}>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip>Select a job type to filter by</Tooltip>
                                }
                            >
                                <Dropdown.Toggle id="dropdown-basic">
                                    <Filter />
                                </Dropdown.Toggle>
                            </OverlayTrigger>
                            <Dropdown.Menu>
                                {
                                    Object.keys(JobType).map((jobType) => {
                                        const jobTypeValue = JobType[jobType]
                                        return (
                                            <Dropdown.Item key={jobTypeValue.ui} onClick={(e) => {
                                                setSearchState({
                                                    ...searchState,
                                                    selectedJobType: jobTypeValue
                                                })
                                            }} active={searchState.selectedJobType === jobTypeValue ? true : false}>
                                                {jobTypeValue.ui}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip>Enter a keyword to search for jobs</Tooltip>
                            }
                        >
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search for jobs"
                                aria-label="Search for jobs"
                                aria-describedby="basic-addon1"
                                onChange={(e) => {
                                    setSearchState({
                                        ...searchState,
                                        searchString: e.target.value
                                    })
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        initiateSearch()
                                    }
                                }}
                                required />
                        </OverlayTrigger>

                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip>Search</Tooltip>
                            }
                        >
                            <button className="input-group-text" id="basic-addon1" onClick={() => {
                                initiateSearch()
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                                </svg>
                            </button>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
            <div className={'job-search-results-container container'}>
                <div className={'search-results-title'}>
                    {
                        searchState.searchFetchError &&
                        <div className={'search-result-error'}>
                            {searchState.searchFetchError}
                        </div>
                    }
                    {
                        (searchState.searchStatus === JobSearchStatus.Success) &&
                        <h4>We found {searchState.listOfJobs.length} results for "{searchState.searchString}"</h4>
                    }
                    {
                        (searchState.searchStatus === JobSearchStatus.InProgress) &&
                        <div className={'row justify-content-center'}>
                            <div className="spinner-border text-primary align-self-" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    }
                </div>
                <div className={'search-results container'}>
                    <div className={'search-results-data row'}>
                        {searchState.listOfJobs.map((job, index) => {
                            return (
                                <div key={`${job.title}-${job.location}-${job.company}-${index}`} className={'search-result col-12'}>
                                    <div className={'job'}>
                                        <div className={'job-header row'}>
                                            <div className={'company-title col-12'}>
                                                {job.company.title}
                                            </div>

                                            <div className={'job-title col-12 h5'}>
                                                {job.role.title}
                                            </div>

                                            <div className={'company-title col-12'}>
                                                {job.location}
                                            </div>
                                        </div>
                                        <div className={'job-controls inline-buttons'}>
                                            <div className={'learn-more-button'}>
                                                <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => { alert("Not implemented yet") }}>
                                                    Learn More
                                                    <span className={'button-icon-right'}><BoxArrowUpRight /></span>
                                                </button>
                                            </div>
                                            <div className={'like-button'} onClick={() => { alert("Not implemented yet") }}>
                                                <button type="button" className="btn btn-outline-primary btn-sm">
                                                    Like
                                                    <span className={'button-icon-right'}><HeartFill /></span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={'job-detail-container row'}>
                                            <div className={'company-title col-12'}>
                                                {job.description}
                                            </div>
                                        </div>
                                        <div className={'job-border-bottom'}></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobSearch;