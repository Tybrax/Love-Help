import React, { useState, useEffect, useMemo } from 'react';
import { Container, Button } from 'react-bootstrap';
import logoGreen from '../../images/logo_green.png';
import logoRed from '../../images/logo_red.png';
import mapStyles from "./mapStyles";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'
import Geocode from 'react-geocode';
import { Location } from '../homepage/Location';
import axios from 'axios';

Geocode.setApiKey("AIzaSyBT5euhpYYvpzGV7EkplwyF1AttF4jvr2A");
Geocode.setLanguage("en");
Geocode.setRegion("fr");

const libraries = ["places"];

const requestEndPoint = 'http://localhost:3001/api/v1/requests';

const mapContainerStyle = {
    width: '100vh',
    height:'100vh'
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

    /*state for map*/
    const [userLocation, setUserLocation] = useState({
        lat: parseFloat(localStorage.getItem('userLatitude')),
        lng: parseFloat(localStorage.getItem('userLongitude'))
    })
    const [center, setCenter] = useState(userLocation);
    const [zoom, setZoom] = useState(12);

    /*states for markers*/
    const [markers, setMarkers] = useState([]);
    const [icons, setIcons] = useState([]);

    /*states for infowindows*/
    const [windows, setWindows] = useState();
    const [infoOpen, setInfoOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState();

    /*BUILDING*/
    /*state for fulfilled request*/
    const [fulfillBtnCount, seTfulfillBtnCount] = useState([]);


    const handleClick = (id) => {

        const endpointWindow = `${requestEndPoint}/${id}`;

            setTimeout( () => {
                /*Get request for a clicked marker*/
                axios.get(endpointWindow)
                .then(response => {

                    const clickResponse = response.data;

                    const windowObject = {
                        windowsId: clickResponse.id,
                        type: clickResponse.request_type,
                        title: clickResponse.title.toUpperCase(),
                        description : clickResponse.description,
                        location: {
                            lat: parseFloat(clickResponse.location.split(',')[0]),
                            lng: parseFloat(clickResponse.location.split(',')[1].trim())
                        }
                    };

                    /*Translate the address from coordinates to letters*/
                    Geocode.fromLatLng(String(windowObject.location.lat), String(windowObject.location.lng))
                    .then((response) => {

                       /*Append the address to the object*/
                       windowObject.address = response.results[0].formatted_address;
                    })

                    /*Handle request if errors occur*/
                    .catch((error) => {
                        alert("Coordinates cannot be translated");
                    })

                    /*Update states to retrieve data from the JSX*/
                    setWindows(windowObject);
                    setInfoOpen(true);
                    setCenter(windowObject.location);
                })
                .catch(error => {
                    console.log('ERROR DESCRIPTION : ' + error)
                })
            }, 500)
    }

    /*Get user's current position to center the map*/
    useEffect(() => {
        setTimeout(() => {
            axios.get(requestEndPoint)
            .then(res => {
                const responseData = res.data;

                /*Edit the coordinates so they have the accepted format for googleMap*/
                const coordinates = [];
                const cleanCoordinates = [];

                /*Create empty lists for each request to append to the marker state*/
                const requestsStatus = [];
                const requestsType = [];
                const requestsId = [];

                /*Fill our lists with data from the requests*/
                responseData.map(request => requestsStatus.push(request.fulfilled))
                responseData.map(request => requestsType.push(request.request_type))
                responseData.map(request => requestsId.push(request.id))
                responseData.map(request => coordinates.push(request.location))

                /*Create objects using our lists*/
                let i;
                for (i = 0 ; i < coordinates.length; i++) {
                    const splitCoordinates = coordinates[i].split(",");
                    const latitude = splitCoordinates[0];
                    const longitude = splitCoordinates[1].trim();
                    const type = requestsType[i];
                    const requestId = requestsId[i]
                    /*alert(type);*/
                    const coordinatesObject = {
                        lat: parseFloat(latitude),
                        lng: parseFloat(longitude),
                        id: requestId,
                        icon: type
                    };
                    cleanCoordinates.push(coordinatesObject);
                }

                /*Update state to have an array of object containing coordinates and time for React key*/
                setMarkers(cleanCoordinates);
                setIcons(requestsType);
            })
            .catch(e => {
                console.log(e)
            })
        }, 1000);
    })

    /*BUILDING*/
    const FulfillRequest = (id) => {
        console.log("CHANGE STATE TO OPEN A CHAT WINDOWS TO CONNECT REQUESTER AND HELPER");
        const RequestCount = {
            id: id,
            count: 0
        }

    }

    if (loadError) return "Error loading Maps";
    if (!isLoaded) return "Loading Maps"
    return (
        <Container className="d-flex justify-content-center">
            <div>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={zoom}
                    center={center}
                    options={options}
                >
                    {/*Create markers for each request*/}
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            icon={{
                                url: (marker.icon === "One-time task") ? logoRed : logoGreen,
                                scaledSize: new window.google.maps.Size(50,50),
                                origin: new window.google.maps.Point(0,0),
                                anchor: new window.google.maps.Point(25,25)
                            }}
                            onClick={() => {handleClick(marker.id)}}
                        />
                    ))}

                    {/*Display basics information for clicked requests*/}
                    {windows && infoOpen && (
                        <InfoWindow
                            position={windows.location}
                            onCloseClick={() => setInfoOpen(false)}
                        >
                            <div>
                                <h4 className="info-title">{windows.title}</h4>
                                <h6
                                    className="info-text"
                                    style={{ color : (windows.type === "One-time task") ? ' #c70039' : '#086F00'}}
                                >
                                    {windows.type}
                                </h6>
                                <p className="info-text">{windows.address}</p>
                                <Button
                                    className="btn-dark d-block mx-auto"
                                    onClick={() => FulfillRequest(windows.windowsId)}
                                >
                                    Fulfill
                                </Button>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>

                {/*Toggle a container to display more information about the clicked request*/}
                { windows && infoOpen && (
                    <Container className="mt-3">
                        <h4 className="info-title">{windows.title}</h4>
                        <h6
                            className="info-text"
                            style={{ color : (windows.type === "One-time task") ? ' #c70039' : '#086F00'}}
                        >
                            TYPE : {windows.type}
                        </h6>
                        <p className="info-text">ADDRESS : {windows.address}</p>
                        <p className="info-text">DESCRIPTION : {windows.description}</p>
                        <Button
                            className="btn-dark d-block mx-auto"
                            onClick={() => FulfillRequest(windows.windowsId)}
                        >
                            Fulfill
                        </Button>
                    </Container>
                )}
            </div>
        </Container>
    )
}

export default MapComponent;
