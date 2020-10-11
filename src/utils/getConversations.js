import axios from 'axios';

export const getConversations = async (token) => {
    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };
    const endPoint = 'http://localhost:3001/messages';

    const request = await axios.get(endPoint, config);
    return request;
}
