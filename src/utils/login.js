import axios from 'axios';

/* login endpoint to declare*/
const endPoint = '';

export const login = async (data) => {
    const response = await.post(endPoint, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
    return response;
}
