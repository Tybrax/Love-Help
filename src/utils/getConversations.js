import axios from 'axios';

export const getConversations = async (token) => {
    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };
    const endPoint = `${process.env.REACT_APP_BASE_URL}/messages`;

    const request = await axios.get(endPoint, config);
    return request;
}
