import axios from 'axios';

/*signup endpoint to declare*/
const endPoint = ''

export const signup = async (data) => {
    const response = await axios.post(endPoint, JSON.stringify(data), {
        headers: {
            'content-type': 'application/json'
        }
    });

    /*return a promise*/
    return response;
};
