import axios from 'axios';

export const fulfillRequest = async (requestId, token) => {
    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    }
    const updateRoute = `${process.env.REACT_APP_BASE_URL}/requests/${requestId}`;
    const updateRequest = await axios.put(updateRoute, {status: 'fulfilled'});
    console.log(updateRequest);
}

export const unfulfillRequest = async (requestId) => {
    const updateRoute = `${process.env.REACT_APP_BASE_URL}/requests/${requestId}`;
    const updateRequest = await axios.put(updateRoute, {status: 'unfulfilled'});
}

export const pendingRequest = async (requestId) => {
    const updateRoute = `${process.env.REACT_APP_BASE_URL}/requests/${requestId}`;
    const updateRequest = await axios.put(updateRoute, {status: 'pending'});
}
