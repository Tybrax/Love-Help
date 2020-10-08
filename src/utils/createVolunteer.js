import axios from 'axios';

/*MAKE SURE THE INDEX ACTION IS WORKING PROPERLY BEFORE RUNNING THOSE FUNCTIONS*/
/*CHECK RETURN FOR TYPES IN COMPONENTS*/

/*Store the total number of volunteers*/
export const getVolunteers = async (token, requestId) => {

    const endPoint = `http://localhost:3001/volunteers`;
    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

    const request = await axios.get(endPoint, config);
    return request;
}

/*Filter the volunteer for a given request*/
export const volunteersFilter = (array, requestId) => {
    let count = 0;
    array.map((volunteer) => {
        ((volunteer.request_id === requestId) ? count += 1 : count = 0);
    })
    return count;
}

/*Check if the number of volunteers for a given request is inferior to 5*/
export const volunteersCheck = (count) => {
   return ((count < 5) ? 'create' : 'full')
}

/*Post a volunteer to backend*/
export const createVolunteer = async (token, userId, requestId) => {
    const endPoint = `http://localhost:3001/requests/${requestId}/volunteers`;
    const body = {
        user_id: userId,
        request_id: requestId
    };
    const config = {
        headers: {
            'authorization': `bearer ${token}`,
            'content-type': 'application/json'
        }
    };
    const request = await axios.post(endPoint, body, config);
    return request;
}
