import axios from 'axios';

export const getRequest = async (token, requestID) => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/requests/${requestID}`;

    const config = { headers: {
        'authorization': `bearer ${token}`
    }}

    const request = await axios.get(endpoint, config);
    return request;
}
