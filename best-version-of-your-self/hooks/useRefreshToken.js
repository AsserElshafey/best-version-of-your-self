import { axiosPublic } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { getAccessToken, setAuth, logout } = useAuth();

    const refresh = async () => {
        try {
            // Use the current token from memory to request a new one
            const response = await axiosPublic.post('/auth/refresh', 
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${getAccessToken()}`
                    },
                    withCredentials: false
                }
            );
            
            // Store the new token
            setAuth({
                accessToken: response.data.accessToken
            });
            
            return response.data.accessToken;
        } catch (error) {
            // If refresh fails, logout
            logout();
            throw error;
        }
    }
    return refresh;
};

export default useRefreshToken;