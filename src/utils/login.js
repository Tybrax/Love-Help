import axios from 'axios';

/* temporary login endpoint to declare*/
const loginEndPoint = `${process.env.REACT_APP_BASE_URL}/login`;

export const login = async (data) => {
    const response = await axios.post(loginEndPoint, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
    return response;
}
