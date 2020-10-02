export const setPosition = (latitude, longitude, error) => {
    if (latitude == null || longitude == null) {
        return error;
    } else {
        const userCoordinates = {
            lat: latitude,
            lng: longitude
        };
        for (const key in userCoordinates) {
            localStorage.setItem(`${key}`, `${userCoordinates[key]}`);
        }
    }
}
