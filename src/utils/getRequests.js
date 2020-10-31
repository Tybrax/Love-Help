import axios from 'axios';

export const getRequests = async (token) => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/requests`;

    const config = { headers: {
        'authorization': `bearer ${token}`,
        'content-type': 'application/json'
    }}

    const request = await axios.get(endpoint, config);
    return request;
}
