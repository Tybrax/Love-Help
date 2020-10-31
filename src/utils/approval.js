import axios from 'axios';

export const approval = async (userID) => {

    const url = `${process.env.REACT_APP_BASE_URL}/user/${userID}`;

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    };

    const data = {
        "approved": "true"
    }
    const request = await axios.put(url, data, config);

    return request;
}
