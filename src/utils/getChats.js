import axios from 'axios';

const getVolunteer = async (volunteersIds, token) => {
    const volunteersData = [];

    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

    const names = [];

    for (const volunteerId of volunteersIds) {
        const firstEndPoint = `http://localhost:3001/volunteer/${volunteerId}`;
        const firstResponse = await axios.get(firstEndPoint, config);
        const volunteerData = await firstResponse.data;

        const secondEndpoint = `http://localhost:3001/user/${volunteerData.user_id}`;
        const userData = getUser(volunteerData.user_id);
        userData.then((response) => {
            names.push(response);
        })
    }

    return names;

}

export const getUser = async (userID) => {
    /*MAKE SINGLE REQUEST FOR EACH USER AND RETRIEVE FULL NAME*/
    const response = await axios.get(`http://localhost:3001/user/${userID}`);
    const data = await response.data;
    const fullName = `${data.first_name} ${data.last_name}`;
    return fullName;
}


const getChats = async (token, currentUserId) => {
    /*HTTP requests required attributes*/
    const endPoint = 'http://localhost:3001/chats';
    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

    const request = await axios.get(endPoint, config);
    const chatsData = await request.data;

    const userIds = [];
    const volunteersIds = [];

    chatsData.map((chat) => {
        if (chat.user_id === currentUserId) {
            volunteersIds.push(chat.volunteer_id);

        } else if (chat.volunteer_id === currentUserId) {
            userIds.push(chat.user_id);
        }
    });

    if (userIds.length) {
        const namesFromUsers = await getUser(userIds);
        return namesFromUsers;
    } else if (volunteersIds.length) {
        const namesFromVolunteers = getVolunteer(volunteersIds, token);
        return namesFromVolunteers;
    }
}

const getRequestTitle = async (token, requestId) => {

    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

    const request = await axios.get(`http://localhost:3001/requests/${requestId}`, config);
    const requestData = await request.data;
    return requestData;

}

export const getRequestInformations = async (token, currentUserId) => {
    /*HTTP requests required attributes*/
    const endPoint = 'http://localhost:3001/chats';
    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

    const request = await axios.get(endPoint, config);
    const chatsData = await request.data;

    const requestsId = [];
    const usersId = [];

    chatsData.map((request) => {
        requestsId.push(request.request_id);
        usersId.push(request.user_id);
    })

    const requestsInformations = [];
    requestsId.map((requestId) => {
        const informations = getRequestTitle(token, requestId);
        informations.then((response) => {
            requestsInformations.push(response.title);
        })

    })

    const userNames = [];
    usersId.map((userId) => {
        const fullName = getUser(userId);
        fullName.then((response) => {
            userNames.push(response);
        })
    })

    /*CREATE A VARIABLE THAT STORE THE REQUEST OBJECT AND THE USERNAME*/
    const requestsData = {
        requestId: requestsId,
        informations: requestsInformations,
        userNames: userNames
    }

    return requestsData;

}
