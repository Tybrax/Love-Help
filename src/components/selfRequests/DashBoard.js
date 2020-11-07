import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { decodeToken } from '../../utils/decodeToken';
import { getRequests } from '../../utils/getRequests.js';
import { Image } from './Image';
import { Volunteering } from './Volunteering';
import { Link } from "react-router-dom";
import { Loader } from "../../Loader";

const Requests = lazy(() => import('./Requests.js'));

const renderLoader = () => <Loader type="balls" color="black" />;

export const DashBoard = () => {

    const [token, setToken] = useState(
        localStorage.getItem('userToken') || null
    )
    const currentUserId = decodeToken(token).user_id;

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        let mounted = true;

        const allRequests = getRequests(token);
        allRequests.then((response) => {
            if (mounted) {
                const myRequests = [];
                response.data.map((request) => {
                    if ((request.user_id === currentUserId) && (request.status != 'fulfilled')) {
                        myRequests.push(request);
                    }
                })
                setRequests(myRequests);
            }
        })

        return () => mounted = false;
    }, [requests])

    return (
        <Container fluid className="mt-5 mb-5">
            <Row>
                <Col xs={12} sm={12} md={6}>
                    <h3 className="request__title p-3 m-5 text-center">Requests</h3>
                    {(requests.length === 0) ? (
                        <Container>
                            <h5 className="p-3 m-2 text-center">No request so far</h5>
                        </Container>
                    ) : (
                        <Suspense fallback={renderLoader()} >
                            <Requests arrayOfRequests={requests} />
                        </Suspense>
                    )}
                </Col>
                <Col xs={12} sm={12} md={6}>
                    <Volunteering />
                </Col>
            </Row>
        </Container>
    )
};
