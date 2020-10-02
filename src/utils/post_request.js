import axios from 'axios';

export const post_request = async (data, token) => {

    const endPoint = 'http://localhost:3001/requests';

    const config = { headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${token}`
    }}


    const response = await axios.post(endPoint, data, config);
    return response
}
