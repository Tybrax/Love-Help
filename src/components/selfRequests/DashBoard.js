import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { decodeToken } from '../../utils/decodeToken';
import { getRequests } from '../../utils/getRequests.js';
import { Image } from './Image';
import { Requests } from './Requests';
import { Volunteering } from './Volunteering';
import { Link } from "react-router-dom";


export const DashBoard = () => {

    const [token, setToken] = useState(
        localStorage.getItem('userToken') || null
    )
    const currentUserId = decodeToken(token).user_id;

    const [requests, setRequests] = useState([]);
    const [volunteering, setVolunteering] = useState([]);

    useEffect(() => {
        let mounted = true;

        /*get requests data*/
        const allRequests = getRequests(token);
        allRequests.then((response) => {
            if (mounted) {
                const myRequests = [];
                response.data.map((request) => {
                    if (request.user_id === currentUserId) {
                        myRequests.push(request);
                    }
                })
                setRequests(myRequests);
            }
        })

        /*get volunteering data*/


        /*useEffect hook cleanup function*/
        return () => mounted = false;
    }, [requests])

    return (
        <Container className="mt-5">
            <Row>
                <Col xs={12} sm={12} md={6}>
                    <h2 className="request__title p-3">Requests</h2>
                    <Requests arrayOfRequests={requests} />
                </Col>
                <Col xs={12} sm={12} md={6}>
                    <h2 className="request__title p-3">Volunteering</h2>
                    <Volunteering />
                </Col>
            </Row>
        </Container>
    )
};
