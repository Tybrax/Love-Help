import axios from 'axios';

export const getRequests = (token) => {
    const endpoint = 'http://localhost:3001/requests';

    const config = { headers: {
        'authorization': `bearer ${token}`,
        'content-type': 'application/json'
    }}

    const request = axios.get(endpoint, config);
    return request;
}
