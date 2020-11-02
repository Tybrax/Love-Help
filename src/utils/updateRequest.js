import axios from 'axios';

export const updateRequest = async (requestId) => {
    const updateRoute = `${process.env.REACT_APP_BASE_URL}/requests/${requestId}`;
    const updateRequest = await axios.put(updateRoute, {status: 'pending'});
}
