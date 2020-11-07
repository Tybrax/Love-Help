import axios from 'axios';

/*Retrieve every request on turn their status to pending if the volunteer count reaches 5*/
export const suspendRequest = async (token) => {

    /*Routes*/
    const getRequestsURI = `${process.env.REACT_APP_BASE_URL}/requests`;

    /*HTTP request headers*/
    const config = {
        headers: {
            "authorization": `bearer ${token}`
        }
    }

    const requests = await axios.get(getRequestsURI, config);
    return requests;
}
