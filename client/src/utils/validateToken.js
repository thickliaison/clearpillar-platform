import { jwtDecode } from 'jwt-decode';

export default function isTokenExpired(token) {
    if (!token) return true;

    try {
        const { exp } = jwtDecode(token); // Decode the token to get the expiration time
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
};