import axios from 'axios';

/*signup endpoint to declare*/
const endPoint = 'http://localhost:3001/auth/signup';
const config = { headers: {
    'content-type': 'multipart/form-data'
}}

export const signup = async (form) => {
    /*const { email, password, password_confirmation, first_name, last_name, file } = dataObject;*/
/*    const formData = new FormData();
    for (const key in dataObject) {
        formData.append(key, dataObject[key])
    }*/

    const response = await axios.post(endPoint, form, config);

    /*return a promise*/
    /*return response;*/
};
