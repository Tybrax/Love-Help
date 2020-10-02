export const logout = () => {
    localStorage.removeItem('userToken');
    const dataToRemove = {
        token: 'userToken',
        userID: 'userId',
        email: 'email',
        firstName: 'firstName',
        lastName: 'lastName'
    }
    for (const key in dataToRemove) {
        localStorage.removeItem(`${dataToRemove[key]}`);
    }
}
