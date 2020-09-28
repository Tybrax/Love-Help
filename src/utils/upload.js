import axios from 'axios';

export const upload = async (userID, file, token) => {

    const url = `http://localhost:3001/user/${userID}/file`;

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'authorization': `bearer ${token}`
        }
    };
    const request = await axios.post(url, file, config);

    return request;
}
