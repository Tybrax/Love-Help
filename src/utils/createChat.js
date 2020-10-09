import axios from 'axios';

export const createChat = async (token, requesterId, volunteerId, requestId) => {
    const endPoint = `http://localhost:3001/requests/${requestId}/chats`
    const body = {
        user_id: requesterId,
        volunteer_id: volunteerId,
        request_id: requestId
    }
    const config = {
        headers: {
            'authorization': `bearer ${token}`,
            'content-type': 'application/json'
        }
    };

    const request = await axios.post(endPoint, body, config);
    return request;
}
