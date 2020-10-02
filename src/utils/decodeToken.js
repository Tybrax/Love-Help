import jwt_decode from 'jwt-decode';

export const decodeToken = (token) => {
    if (!token) {
        return false;
    } else {
        const decodedToken = jwt_decode(token);
        return decodedToken;
    }
}
