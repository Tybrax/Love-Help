import axios from 'axios';

/*MAKE SURE THE INDEX ACTION IS WORKING PROPERLY BEFORE RUNNING THOSE FUNCTIONS*/
/*CHECK RETURN FOR TYPES IN COMPONENTS*/

/*Store the number of volunteers for a given request ID*/
const volunteersCount = async (token, requestId) => {

    const endPoint = `http://localhost:3001/requests/${requestId}/volunteers`;
    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

    const request = await axios.get(endPoint, config);
    request.then((response) => {
        /*1. PRINT THE RESPONSE OBJECT FOR TESTING*/

        /* 2. GET THE LENGTH OF ARRAY*/
        const count = response.data.length;
        /* 3. RETURN THE LENGTH OF ARRAY*/
        return count;
    })
    .catch((error) => {
        console.log(`cannot compute the count of volunteer for request number ${requestId}.`)
        return false;
    })
}

/*Check if the number of volunteers for a given request is inferior to 5*/
const volunteersCheck = () => {
    if (volunteersCount() === false) {
        return false;
    } else {
        if (volunteersCount() >= 5) {
            return false;
        } else {
            return true;
        }
    }
}

export const CreateVolunteer = async (token, userId, requestId) => {
    if (volunteersCheck() === false) {
        return "Too many volunteers already have contacter the requester."
    } else {

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
    }
}
