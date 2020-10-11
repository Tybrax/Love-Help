import axios from 'axios'

const retrieveUserInformation = async (userId) => {
    const endPoint = `http://localhost:3001/user/${userId}`;

    const request = await axios.get(endPoint);
    const userData = request.data;
    const names = {
        firstName: userData.first_name,
        lastName: userData.last_name
    }

    const fullName = `${names.firstName} ${names.lastName}`;
    return fullName;
}

export const getUserInformation = (arrayOfUserIds) => {

    const fullNames = []

    arrayOfUserIds.map((userId) => {
        const getNames = retrieveUserInformation(userId);
        getNames.then((response) => {
            fullNames.push(response);
        })
    })

    return fullNames;
}
