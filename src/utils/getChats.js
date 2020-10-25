import axios from 'axios';

const getUserIdFromVolunteer = async (volunteerId, token) => {

    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

    const endPoint = `http://localhost:3001/volunteer/${volunteerId}`;
    const response = await axios.get(endPoint, config);
    const userId = await response.data.user_id;

    return userId;

}

export const getUser = async (userID) => {
    /*MAKE SINGLE REQUEST FOR EACH USER AND RETRIEVE FULL NAME*/
    const response = await axios.get(`http://localhost:3001/user/${userID}`);
    const data = await response.data;
    const fullName = `${data.first_name} ${data.last_name}`;
    return fullName;
}

/*MAIN FUNCTION TO CALL FOR RETRIEVING THE NAME FROM THE CORRECT CHATROOMS*/
export const getChats = async (token, currentUserId) => {
    /*HTTP requests required attributes*/
    const endPoint = 'http://localhost:3001/chats';
    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

    /*GET /chats to retrieve all the chatrooms informations*/
    const request = await axios.get(endPoint, config);
    const chatsData = await request.data;
    const volunteersIdsFromChats = [];

    chatsData.map((chat) => {
        volunteersIdsFromChats.push(chat.volunteer_id);
    })

    const chatRoomsInformations = [];

    /*Compare the current_user_id to the ids within the JSON response from GET /chats*/
    let i = 0;
    for await (let chat of chatsData) {
        const promise = getUserIdFromVolunteer(chat.volunteer_id, token);
        promise.then((response) => {
        const userIdFromVolunteer = response;

        if (chat.user_id === currentUserId) {
            const name = getUser(currentUserId);
            const firstPromise =  getUserIdFromVolunteer(chat.volunteer_id, token);
            firstPromise.then((firstResponse) => {
                const secondPromise =  getUser(firstResponse);
                secondPromise.then((secondResponse) => {
                    chatRoomsInformations.push(secondResponse);
                })
            })

        } else if ( userIdFromVolunteer === currentUserId) {
            const promise =  getUser(chat.user_id);
            promise.then((response) => {
                chatRoomsInformations.push(response);

            })
        }
        })
    }

    return chatRoomsInformations;
}

