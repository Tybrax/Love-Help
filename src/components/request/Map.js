/*TO DO
-> WHEN 5 DIFFERENT USERS FULFILL REQUESTER : REMOVE IT FROM THE MAP
*/
import React, { useState, useEffect, useMemo } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
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
import { decodeToken } from '../../utils/decodeToken';
import { getRequests } from '../../utils/getRequests.js';
import { getRequest } from '../../utils/getRequest.js';
import { getUser } from '../../utils/getChats';
import { updateRequest } from '../../utils/updateRequest.js';
import { volunteersCount } from '../../utils/volunteersCount.js';
import {
    getVolunteers,
    volunteersCheck,
    volunteersFilter,
    createVolunteer,
    usersCheck
} from '../../utils/createVolunteer.js';
import { createChat } from '../../utils/createChat.js';

Geocode.setLanguage("en");
Geocode.setRegion("fr");

const libraries = ["places"];

const mapContainerStyle = {
    width: '100%',
    height:'60vh'
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
};

export const MapComponent = () => {

    /*state for user*/
    const [token, setToken] = useState(
        localStorage.getItem('userToken') || null
    )
    const currentUserId = decodeToken(token).user_id;

    /*state for map*/
    const [userLocation, setUserLocation] = useState({
        lat: parseFloat(localStorage.getItem('lat')),
        lng: parseFloat(localStorage.getItem('lng'))
    })
    const [center, setCenter] = useState(userLocation);
    const [zoom, setZoom] = useState(12);

    /*states for errors*/
    const [requestsError, setRequestsError] = useState(false);
    const [coordinatesError ,setCoordinatesError] = useState(false);
    const [singleRequestError, setSingleRequestError] = useState(false);
    const [volunteersError, setVolunteersError] = useState(false);
    const [chatError, setChatError] = useState(false);
    const [volunteerNotCreated, setVolunteerNotCreated] = useState(false);
    const [counterError, setCounterError] = useState(false);

    /*states for markers*/
    const [markers, setMarkers] = useState([]);
    const [icons, setIcons] = useState([]);

    /*states for infowindows*/
    const [windows, setWindows] = useState();
    const [infoOpen, setInfoOpen] = useState(false);
    const [requesterName, setRequesterName] = useState();

    /*states for volunteers & chats*/
    const [volunteerFull, setVolunteerFull] = useState(false);
    const [newVolunteer, setNewVolunteer] = useState(false);
    const [requesterId, setRequesterId] = useState(null);
    const [chatCreated, setChatCreated] = useState(false);
    const [chatId, setChatId] = useState(null);


    useEffect(() => {
            let mounted = true;
            const promise = getRequests(token);
            promise.then((response) => {
                if (mounted) {
                    const responseData = response.data;

                    /*Edit the coordinates so they have the accepted format for googleMap*/
                    const coordinates = [];
                    const cleanCoordinates = [];

                    /*Create empty lists for each request to append to the marker state*/
                    const requestsStatus = [];
                    const requestsType = [];
                    const requestsId = [];

                    /*Fill our lists with data from the requests*/
                    responseData.map(request => requestsStatus.push(request.status));
                    responseData.map(request => requestsType.push(request.request_type));
                    responseData.map(request => requestsId.push(request.id));
                    responseData.map(request => coordinates.push(request.location));

                    /*Create objects using our lists*/
                    let i;
                    for (i = 0 ; i < coordinates.length; i++) {
                        const splitCoordinates = coordinates[i].split(",");
                        const latitude = splitCoordinates[0];
                        const longitude = splitCoordinates[1].trim();
                        const type = requestsType[i];
                        const requestId = requestsId[i];
                        const status = requestsStatus[i];

                        const coordinatesObject = {
                            lat: parseFloat(latitude),
                            lng: parseFloat(longitude),
                            id: requestId,
                            icon: type,
                            status: status
                        };
                        cleanCoordinates.push(coordinatesObject);
                    }

                    /*Update state to have an array of object containing coordinates and time for React key*/
                    setMarkers(cleanCoordinates);
                    setIcons(requestsType);
                }
            })
            .catch((error) => {
                if (requestsError === false) {
                    setRequestsError(true);
                }
            })
            return () => mounted = false;
    }, [markers])

    const openWindow = (id) => {
            /*Get request for a clicked marker*/
            const promise = getRequest(token, id);
            promise.then(response => {
                const clickResponse = response.data;
                const publisherId = response.data.user_id;
                const secondPromise = getUser(publisherId);

                secondPromise.then((response) => {
                    setRequesterName(response);
                })
                setRequesterId(publisherId);
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
                const volunteerCounter = volunteersCount(token, id);
                volunteerCounter.then((response) => {
                    if (response) {
                        windowObject.counter = response;
                    }
                })
                .catch((error) => {
                    setCounterError(true);
                })

                Geocode.fromLatLng(String(windowObject.location.lat), String(windowObject.location.lng))
                .then((response) => {
                   windowObject.address = response.results[0].formatted_address;
                })
                .catch((error) => {
                    setCoordinatesError(true);
                })

                setWindows(windowObject);
                setInfoOpen(true);
                setCenter(windowObject.location);
            })
            .catch(error => {
                setSingleRequestError(true);
            })
    }

    const postVolunteer = (id) => {
        const promise = getVolunteers(token, id);
        promise.then((response) => {
            const totalVolunteers = response.data;
            const count = volunteersFilter(totalVolunteers, id);
            const userChecker = usersCheck(totalVolunteers, id, currentUserId);
            const volunterChecker = volunteersCheck(userChecker[0]);
            if (volunterChecker === 'create' && (userChecker[1] === false)) {
                const secondPromise = createVolunteer(token, currentUserId, id);
                secondPromise.then((response) => {
                    const volunteerId = response.data.id;
                    /*create a chat using the volunteerID*/
                    const thirdPromise = createChat(token, requesterId, volunteerId, id);

                    thirdPromise.then((response) => {
                        setChatCreated(true);
                        setChatId(response.data.id);
                    })
                    .catch((error) => {
                        setChatError(true);
                    })
                })
                .catch((error) => {
                    setVolunteerNotCreated(true);
                })
            } else if (volunterChecker === 'full' && (userChecker[1] === false)) {
                setVolunteerFull(true);
            } else if (volunterChecker === 'update status' && (userChecker[1] === false)) {
                updateRequest(id);
            }
        })
        .catch((error) => {
            setVolunteersError(true);
        })
    }

    return (
        // Display Errors
            <div>
            { requestsError && (
                <Alert variant="danger" className="alert-fail text-center">
                    <h4>Can't display requests on the map, please try later.</h4>
                </Alert>
            )}
            { coordinatesError && (
                <Alert variant="danger" className="alert-fail text-center">
                    <h4>Can't display translate addresses into coordinates.</h4>
                </Alert>
            )}
            { singleRequestError && (
                <Alert variant="danger" className="alert-fail text-center">
                    <h4>Can't load request from server.</h4>
                </Alert>
            )}
            { volunteersError && (
                <Alert variant="danger" className="alert-fail text-center">
                    <h4>Can't display volunteers from server.</h4>
                </Alert>
            )}
            { chatError && (
                <Alert variant="danger" className="alert-fail text-center">
                    <h4>Can't create a chat.</h4>
                </Alert>
            )}
            { volunteerNotCreated && (
                <Alert variant="danger" className="alert-fail text-center">
                    <h4>Can't create a volunteer.</h4>
                </Alert>
            )}
            { counterError && (
                <Alert variant="success" className="alert-fail text-center">
                    <h4>Can't display counter.</h4>
                </Alert>
            )}
            { chatCreated && (
                <Alert variant="success" className="alert-fail text-center">
                    <h4>Request successfully answered.</h4>
                </Alert>
            )}
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={zoom}
                    center={center}
                    options={options}
                >

                    {markers.map((marker) => (
                        (marker.status === 'unfulfilled') && (
                            <Marker
                                key={marker.id}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                icon={{
                                    url: (marker.icon === "one-time task") ? logoRed : logoGreen,
                                    scaledSize: new window.google.maps.Size(50,50),
                                    origin: new window.google.maps.Point(0,0),
                                    anchor: new window.google.maps.Point(25,25)
                                }}
                                onClick={() => {openWindow(marker.id)}}
                            />
                        )
                    ))}

                    {/*Display basics information for clicked requests*/}
                    {windows && infoOpen && (
                        <InfoWindow
                            position={windows.location}
                            onCloseClick={() => setInfoOpen(false)}
                        >
                            <div>
                                <h4
                                    className="info-title"
                                    style={{ color : (windows.type === "one-time task") ? ' #c70039' : '#086F00'}}
                                >
                                    {windows.title}
                                </h4>
                                <h6
                                    className="info-text font-weight-bold text-uppercase"
                                >
                                    {requesterName}
                                </h6>
                                <h6
                                    className="info-text"
                                    style={{ color : (windows.type === "one-time task") ? ' #c70039' : '#086F00'}}
                                >
                                    {windows.type}
                                </h6>
                                { (!windows.counter) ? (
                                    <h6
                                        className="info-text"
                                        style={{ color : (windows.type === "one-time task") ? ' #c70039' : '#086F00'}}
                                    >
                                        Not clicked yet
                                    </h6>
                                ) : (
                                    <h6
                                        className="info-text"
                                        style={{ color : (windows.type === "one-time task") ? ' #c70039' : '#086F00'}}
                                    >
                                        Clicked : {windows.counter}
                                    </h6>
                                )}
                                <p className="info-text">{windows.address}</p>
                                {(windows.counter >= 5) ? (
                                    <Button
                                        className="btn-dark d-block mx-auto disabled"
                                        onClick={(event) => postVolunteer(windows.windowsId)}
                                    >
                                        Fulfill
                                    </Button>
                                ) : (
                                    <Button
                                        className="btn-dark d-block mx-auto"
                                        onClick={(event) => postVolunteer(windows.windowsId)}
                                    >
                                        Fulfill
                                    </Button>
                                )}

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
                            style={{ color : (windows.type === "one-time task") ? ' #c70039' : '#086F00'}}
                        >
                            TYPE : {windows.type}
                        </h6>
                        <p className="info-text">ADDRESS : {windows.address}</p>
                        <p className="info-text">DESCRIPTION : {windows.description}</p>

                    </Container>
                )}
            </div>
    )
}

export default MapComponent;
