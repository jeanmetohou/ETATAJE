import { Navigate } from 'react-router-dom';
import { accountService } from '@/_services/account.service';

const AuthGuard = ({ children }) => {

    if (accountService.isLogged()) {
        return children
    }
        return <Navigate to='/auth/login' />
    
};

export default AuthGuard;