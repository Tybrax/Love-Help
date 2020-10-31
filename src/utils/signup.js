import axios from 'axios';

/*signup endpoint to declare*/
const endPoint = `${process.env.REACT_APP_BASE_URL}/users`;
const config = { headers: {
    'content-type': 'application/json'
}}

export const signup = async (data) => {
    const response = await axios.post(endPoint, data, config);
    return response
};
