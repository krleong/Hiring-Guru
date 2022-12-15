import './SideNav.css';
function SideNav() {

    return (
        <div>
            <main>
                <div className="flex-shrink-0 p-3 bg-white" id="side-nav-bar">
                    <a className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom" href="/dashboard/home" >
                        {/* <svg className="bi me-2" style={'width="30" height="24";'}><use xlink:href={"#bootstrap"} /></svg> */}
                        <span className="fs-5 fw-semibold">Dashboard</span>
                    </a>
                    <ul className="list-unstyled ps-0">
                        <li className="mb-1">
                            {/* <a className="dropdown-parent-link" href="/dashboard/home"> */}
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill sidenav-icon" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                </svg>People
                            </button>
                            {/* </a> */}
                            <div className="collapse show" id="home-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="/dashboard/manage-employees" className="link-dark rounded" >Employees</a></li>
                                    {/* <li><a /*href="/dashboard/permissions" className="link-dark rounded">Company Permissions (INACTIVE)</a></li> */}
                                </ul>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase-fill sidenav-icon" viewBox="0 0 16 16">
                                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
                                    <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z" />
                                </svg>Open Positions
                            </button>
                            <div className="collapse show" id="home-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="/dashboard/manage-jobs" className="link-dark rounded">Manage Jobs</a></li>
                                    <li><a href="/dashboard/manage-job-roles" className="link-dark rounded">Manage Job Roles</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill sidenav-icon" viewBox="0 0 16 16">
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                </svg>Recruitment
                            </button>
                            <div className="collapse show" id="home-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="/dashboard/manage-job-apps" className="link-dark rounded">Job Applications</a></li>
                                    <li><a href="/dashboard/recruitment-process" className="link-dark rounded">Hiring Pipeline</a></li>

                                </ul>
                            </div>
                        </li>
                        {/* <li className="border-top my-3"></li>
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                                Account
                            </button>
                            <div className="collapse" id="account-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="/dashboard/home" className="link-dark rounded">Overview (COMING SOON)</a></li>
                                    <li><a href="/dashboard/home" className="link-dark rounded">Settings (COMING SOON)</a></li>
                                </ul>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </main>
        </div >
    );
}
export default SideNav;