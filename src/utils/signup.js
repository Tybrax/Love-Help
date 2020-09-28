import axios from 'axios';

/*signup endpoint to declare*/
const endPoint = 'http://localhost:3001/users';
const config = { headers: {
    'content-type': 'application/json'
}}

export const signup = async (data) => {
    const response = await axios.post(endPoint, data, config);
    return response
};
