import { useContext } from 'react';
import { AuthContext } from '../utils/auth/authProvider';

const useAuth = () => useContext(AuthContext);

export default useAuth;
