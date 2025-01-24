import axios from 'axios';
import isTokenExpired from 'utils/validateToken';

// Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (isTokenExpired(token)) {
            console.log('Token is expired');
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            window.location.href = '/login';
            return Promise.reject(new Error('Token expired'));
        }

        // Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 500) {
            window.location.href = '/';
        } else {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
