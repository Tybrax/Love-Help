/*TO DO :
NEED TO KNOW IF USER IS VOLUNTEER OR REQUESTER
-> USE LOCALSTORAGE TO RETRIEVE THIS INFORMATION FROM THE SIDEBAR COMPONENT*/

import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export const Message = ({ message, authorUserId, author }) => {

    const getUser = `http://localhost:3001/user/${authorUserId}`;

    const [name, setName] = useState('');

    useEffect(() => {
        const getUserName = axios.get(getUser);
        getUserName.then((response) => {
            const fullName = `${response.data.first_name} ${response.data.last_name}`
            setName(fullName);
        })
    }, [])

    return (
        <Container>
            <div className="border d-flex flex-row">
                <h6>{name}</h6>
            </div>
            <div className="border d-flex flex-row">
                <h3>{message}</h3>
            </div>
        </Container>
    )
}
