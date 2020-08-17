import axios from 'axios';

/* login endpoint to declare*/
const endPoint = 'http://localhost:3001/auth/signin';

export const login = async (data) => {
    const response = await axios.post(endPoint, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
    return response;
}
