import React from 'react';
import { Container } from 'react-bootstrap';
import logo from '../../images/logo.png';
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
    disableDefaultUI: true,
    zoomControl: true
};

export const MapComponent = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [markers, setMarkers] = React.useState([]);

    if (loadError) return "Error loading Maps";
    if (!isLoaded) return "Loading Maps"
    return (
        <Container className="d-flex justify-content-center">
            <div>
                <h1 className="map-sub-title">LOVE & HELP</h1>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={center}
                    options={options}
                    onClick={(event) => {
                        setMarkers((current) =>  [
                            ...current,
                            {
                                lat: event.latLng.lat(),
                                lng: event.latLng.lng(),
                                time: new Date()
                        }])
                    }}
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
