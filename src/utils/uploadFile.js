import axios from 'axios';

/*API ROUTE FOR UPLOADING A FILE*/
const url = '';

export const uploadFile = async (file) => {

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const request = await axios.post(url, file, config);

    return request;
}
