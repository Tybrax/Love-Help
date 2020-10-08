import axios from 'axios';

export const getRequest = async (token, requestID) => {
    const endpoint = `http://localhost:3001/requests/${requestID}`;

    const config = { headers: {
        'authorization': `bearer ${token}`
    }}

    const request = await axios.get(endpoint, config);
    return request;
}
