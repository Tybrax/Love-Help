import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import logo from '../../images/logo.png';
import mapStyles from "./mapStyles";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'
import axios from 'axios';
const libraries = ["places"];

const requestEndPoint = 'http://localhost:3001/api/v1/requests';

const mapContainerStyle = {
    width: '100vh',
    height:'100vh'
};

const center = {
    lat: 43.294640 ,
    lng: 5.368660
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
};

export const MapComponent = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            axios.get(requestEndPoint)
            .then(res => {
                const responseData = res.data;

                const coordinates = [];
                const cleanCoordinates = [];
                responseData.map(request => coordinates.push(request.location))

                coordinates.map(str => {
                    const splitCoordinates = str.split(",");
                    const latitude = splitCoordinates[0];
                    const longitude = splitCoordinates[1].trim();
                    const coordinatesObject = {
                        lat: parseFloat(latitude),
                        lng: parseFloat(longitude),
                        time: new Date()
                    }
                    cleanCoordinates.push(coordinatesObject);
                })
                console.log(cleanCoordinates);
                setMarkers(cleanCoordinates)
                /*format coordinates

                /*update states by adding each location to the array*/

            })
            .catch(e => {
                console.log(e)
            })
        }, 3000);
    })

    if (loadError) return "Error loading Maps";
    if (!isLoaded) return "Loading Maps"
    return (
        <Container className="d-flex justify-content-center">
            <div>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={center}
                    options={options}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={marker.time.toISOString()}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            icon={{
                                url: logo,
                                scaledSize: new window.google.maps.Size(50,50),
                                origin: new window.google.maps.Point(0,0),
                                anchor: new window.google.maps.Point(25,25)
                            }}
                        />
                    ))}
                </GoogleMap>
            </div>
        </Container>
    )
}

export default MapComponent;
