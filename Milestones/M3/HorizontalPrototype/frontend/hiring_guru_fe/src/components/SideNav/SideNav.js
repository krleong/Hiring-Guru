import './SideNav.css';

function SideNav() {

    return (
        <div>
            <main>
                <div className="flex-shrink-0 p-3 bg-white">
                    <a className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                        {/* <svg className="bi me-2" style={'width="30" height="24";'}><use xlink:href={"#bootstrap"} /></svg> */}
                        <span className="fs-5 fw-semibold">Dashboard</span>
                    </a>
                    <ul className="list-unstyled ps-0">
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                My Teams
                            </button>
                            <div className="collapse show" id="home-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="link-dark rounded">Employees</a></li>
                                    <li><a href="#" className="link-dark rounded">Roles</a></li>
                                    <li><a href="#" className="link-dark rounded">Positions</a></li>
                                    <li><a href="#" className="link-dark rounded">Hiring Pipeline</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                Something Else
                            </button>
                            <div className="collapse show" id="home-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="link-dark rounded">Item 1</a></li>
                                    <li><a href="#" className="link-dark rounded">Item 2</a></li>
                                    <li><a href="#" className="link-dark rounded">Item 3</a></li>
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
                                    <li><a href="#" className="link-dark rounded">Overview</a></li>
                                    <li><a href="#" className="link-dark rounded">Settings</a></li>
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