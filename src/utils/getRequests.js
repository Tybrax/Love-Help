import axios from 'axios';

export const getRequests = async (token) => {
    const endpoint = 'http://localhost:3001/requests';

    const config = { headers: {
        'authorization': `bearer ${token}`,
        'content-type': 'application/json'
    }}

    const request = await axios.get(endpoint, config);
    return request;
}
