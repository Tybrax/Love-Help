import React, { useState, useEffect } from 'react';

export const Location = () => {

    const [latitude, setLatitude] = useState(
        localStorage.getItem('userLatitude') || ''
    );
    const [longitude, setlongitude] = useState(
        localStorage.getItem('userLongitude') || ''
    );

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition( async(position) => {
                const userCoordinates = await {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }

                localStorage.setItem('userLatitude', userCoordinates.latitude);
                localStorage.setItem('userLongitude', userCoordinates.longitude);

            })
        } else {

        }
    })

    return (
        <React.Fragment>
            <h3>Your current location</h3>
            <p>latitude : {latitude}</p>
            <p>longitude : {longitude}</p>
        </React.Fragment>
    )
}
