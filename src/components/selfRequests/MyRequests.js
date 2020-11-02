import React, { useState, useEffect } from 'react';
import { Container, Card, Accordion, Button } from 'react-bootstrap';
import { decodeToken } from '../../utils/decodeToken';
import { getRequests } from '../../utils/getRequests.js';
import { Image } from './Image';
import { SingleAccordion } from './SingleAccordion';

export const MyRequests = () => {

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
                    if (request.user_id === currentUserId) {
                        myRequests.push(request);
                    }
                })
                setRequests(myRequests);
            }
        })
        return () => mounted = false;
    }, [requests])

    const handleClick = (id) => {
        /*DESTROY REQUEST*/
    }

    return (
        <Container className="mt-5 d-flex justify-content-center align-items-center">
            <SingleAccordion arrayOfRequests={requests} />
        </Container>
    )
};
