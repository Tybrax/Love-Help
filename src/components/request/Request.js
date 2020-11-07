import React, { Suspense, useState, useEffect } from 'react';
import { MapComponent } from './Map.js';
import { GeoSuggest } from './GeoSuggest.js';
import { Legend } from './Legend.js';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { getRequests } from '../../utils/getRequests.js';
import { pendingRequest } from '../../utils/updateRequestStatus';
import axios from 'axios';
library.add(fas);

const Counter = React.lazy(() => import('../homepage/Count.js'));

const Loader = () => (
    <ReactLoading type="balls" color="green" height={'30%'} width={'30%'} />
);

const today = new Date();
const date = ("0" + (today.getMonth() + 1)).slice(-2) + '/' + ("0" + today.getDate()).slice(-2) + '/' + today.getFullYear();

export const Request = (props) => {

    const token = localStorage.getItem('userToken') || null;

    /*Markers*/
    const [markers, setMarkers] = useState([]);
    const [icons, setIcons] = useState([]);
    const [requestsError, setRequestsError] = useState(false);

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

            /*Check volunteers for each request and change requests to pending depending on the status*/
            const getRequestsURI = `${process.env.REACT_APP_BASE_URL}/requests`;
            const config = {
                headers: {
                    "authorization": `bearer ${token}`
                }
            }

            const allRequests = axios.get(getRequestsURI, config);
            allRequests.then((response) => {
                response.data.map((request) => {
                    if (request.status != 'fulfilled') {
                        let count = 0
                        const getVolunteersURI = `${process.env.REACT_APP_BASE_URL}/volunteers`;
                        const allVolunteers = axios.get(getVolunteersURI, config);
                        allVolunteers.then((response) => {
                            response.data.map((volunteer) => {
                                if (volunteer.request_id === request.id) {
                                    count += 1;
                                }
                                if (count === 5) {
                                    pendingRequest(request.id);
                                }
                            })
                        })
                    }
                })
            })

            return () => mounted = false;
    }, [markers])

    if (token) {
        return (
            <React.Fragment>
                <Container fluid>
                    <Row>
                        <Col md={12} className='background_style'>
                            <Container>
                                <Row className='justify-content-center'>
                                    <Col className='contribute' md={12}>
                                        <Col md={8}>
                                            <h4 style={{ fontSize: '1.2rem', color: 'black' }} className="session-info subtitle text-center mt-2"><FontAwesomeIcon size="lg" icon={['fas', 'life-ring']} fixedWidth /> Please help us reducing the number of unfulfilled request on {date}</h4>
                                        </Col>
                                        <Col md={4}>
                                            <Suspense fallback={Loader()}>
                                                <Counter className="mt-5" reRenderProp={markers}/>
                                            </Suspense>
                                        </Col>
                                    </Col>
                                </Row>
                            </Container>
                            <Container>
                                <Row className='justify-content-center mt-5'>
                                    <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
                                        <Legend />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <Col md={12} className='background_style_custom'>
                            <Container className='mb-4'>
                                <Row className='justify-content-center'>
                                    <Col className='col_form' sm={12} md={8}>
                                        <MapComponent markers={markers} icons={icons} requestsError={requestsError} />
                                    </Col>
                                    <Col className='col_form' sm={12} md={4}>
                                    <Card style={{margin: 0}} className='card_form' border="light">
                                        <GeoSuggest />
                                    </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    } else {
        return (
            <Redirect to="/" />
        )

    }
};
