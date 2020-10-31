import axios from 'axios';

export const upload = async (userID, file, token) => {

    const url = `${process.env.REACT_APP_BASE_URL}/user/${userID}/file`;

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'authorization': `bearer ${token}`
        }
    };
    const request = await axios.post(url, file, config);

    return request;
}
