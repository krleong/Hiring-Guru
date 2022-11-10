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
                                Company Management
                            </button>
                            {/* </a> */}
                            <div className="collapse show" id="home-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a /*href="/dashboard/employees"*/ className="link-dark rounded" >Companies (INACTIVE)</a></li>
                                    <li><a href="/dashboard/employees" className="link-dark rounded" >Employees</a></li>
                                    <li><a /*href="/dashboard/home"*/ className="link-dark rounded">Roles (INACTIVE)</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="mb-1">
                            {/* <a className="dropdown-parent-link" href="/dashboard/home"> */}
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                Recruitment
                            </button>
                            {/* </a> */}
                            <div className="collapse show" id="home-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a /*href="/dashboard/positions"*/ className="link-dark rounded">Job Listings (INACTIVE)</a></li>
                                    <li><a href="/dashboard/job-apps" className="link-dark rounded">Job Applications</a></li>
                                    <li><a href="/dashboard/recruitment-process" className="link-dark rounded">Hiring Pipeline</a></li>

                                </ul>
                            </div>
                        </li>
                        <li className="border-top my-3"></li>
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                                Account
                            </button>
                            <div className="collapse" id="account-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a /*href="/dashboard/home"*/ className="link-dark rounded">Overview (INACTIVE)</a></li>
                                    <li><a /*href="/dashboard/home"*/ className="link-dark rounded">Settings (INACTIVE)</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </main>
        </div >
    );
}
export default SideNav;