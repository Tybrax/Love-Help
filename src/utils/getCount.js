import axios from 'axios';

export const getCount = async () => {
    const getCount = `${process.env.REACT_APP_BASE_URL}/total`;
    const request = await axios.get(getCount);
    return request;
}
