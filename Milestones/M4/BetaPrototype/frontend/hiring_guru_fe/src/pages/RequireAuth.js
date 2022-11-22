import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const RequireAuth = ({ children }) => {
    const location = useLocation()
    const auth = useAuth()

    if (!auth.user) {
        return <Navigate to='/login' state={{ path: location.pathame }} />
    }
    return children
}