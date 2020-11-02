import axios from 'axios';

export const volunteersCount = async (token, requestId) => {
    const endPoint = `${process.env.REACT_APP_BASE_URL}/volunteers`
    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    }
    try {
        const getVolunteers = await axios.get(endPoint, config);
        const volunteersData = await getVolunteers.data;

        let count = 0;
        for await (const array of volunteersData) {
            if (requestId === array.request_id) {
                count += 1;
            }
        }
        return count;
    } catch(error) {
        return false;
    }
}
