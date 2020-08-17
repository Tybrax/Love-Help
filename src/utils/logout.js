export const logout = () => {
    localStorage.removeItem('userToken');
    return 'You have successfully signed out.'
}
