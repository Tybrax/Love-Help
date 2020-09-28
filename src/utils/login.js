import axios from 'axios';

/* temporary login endpoint to declare*/
const loginEndPoint = 'http://localhost:3001/login';

export const login = async (data) => {
    const response = await axios.post(loginEndPoint, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
    return response;
}
