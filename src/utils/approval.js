import axios from 'axios';

export const approval = async (userID) => {

    const url = `http://localhost:3001/user/${userID}`;

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
