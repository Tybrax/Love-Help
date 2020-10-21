import React, { useState, useEffect } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { getConversations } from '../../utils/getConversations';
import { getUserInformation } from '../../utils/getUserInformation';
import { getRequestInformations } from '../../utils/getChats';
import { getUser } from '../../utils/getChats';
import { decodeToken } from '../../utils/decodeToken';

export const Sidebar = () => {

    /*VARIABLES*/
    const token = localStorage.getItem('userToken') || null;
    const userId = decodeToken(token).user_id;

    /*STATES*/
    const [conversationsError, setConversationsError] = useState(false);
    const [requests, setRequests] = useState([]);

    /*LIFECYCLE*/
    useEffect(() => {
        const allRequests = getRequestInformations(token, userId);
        allRequests.then((response) => {
            console.log(response);
            /*TO DO*/
            /*Set states for requests as an array of iterable objects containing : request title, request id and user id*/
        })
        .catch((error) => {
            setConversationsError(true);
        })
    }, [])

    return (
        <div className="conversations">
            <h2 className="text-center mb-3">CONVERSATIONS</h2>
            { conversationsError && (
                <Alert variant="danger" className="alert-fail text-center mt-3">
                    <h4>Can't load conversations from server.</h4>
                </Alert>
            )}
                <Container className="mt-3 mb-3 conversation border rounded">

                </Container>

        </div>

    )
}
