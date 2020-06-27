import React from 'react';
import { Container } from 'react-bootstrap';
import mapStyles from "./mapStyles";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'

const libraries = ["places"];

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
};

export const MapComponent = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) return "Error loading Maps";
    if (!isLoaded) return "Loading Maps"
    return (
        <Container className="d-flex justify-content-center">
            <div>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={8}
                    center={center}
                    options={options}
                />
            </div>
        </Container>
    )
}

export default MapComponent;
