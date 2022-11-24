import './Footer.css';
import { useAuth0 } from '@auth0/auth0-react';

function Footer() {
    const { isAuthenticated } = useAuth0();

    return (
        <div>
            <div className="container">
                <div className="footer">
                    <footer className="py-3 my-4">
                        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                            <li className="nav-item"><a href={'/'} className="nav-link px-2 text-muted">Home</a></li>
                            {/* <li className="nav-item"><a href={'/jobs'} className="nav-link px-2 text-muted">Job Posts</a></li>
                            <li className="nav-item"><a href={'/pricing'} className="nav-link px-2 text-muted">Pricing</a></li> */}
                            <li className="nav-item"><a href={'/about'} className="nav-link px-2 text-muted">About Us</a></li>
                            {
                                isAuthenticated ? <li className="nav-item"><a href={'/dashboard/home'} className="nav-link px-2 text-muted">Dashboard</a></li>

                                    : <div></div>}
                        </ul>
                        <p className="text-center text-muted">&copy; 2022 Binary Brains</p>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Footer;