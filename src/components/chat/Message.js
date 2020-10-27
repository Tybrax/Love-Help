/*
BASTIEN RATAT
TO DO :
-> 1. Use localStorage from the sidebar component to get currentUser role for each chat
-> 2. Create a function that sort out messages by date
-> 3. Create a function that assigns 0 or 1 to MESSAGE.author for each record
-> 4. Conditional rendering given the author value (styling and positionning)
*/

import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export const Message = ({ message, author }) => {

    if (author == 0) {
        return (
            <Container className="blue-message mb-2">
                <div className="border d-flex flex-row p-3">
                    <h5>{message}</h5>
                </div>
            </Container>
        )
    } else {
        return (
            <Container className="green-message mb-2">
                <div className="border d-flex flex-row-reverse p-3">
                    <h5>{message}</h5>
                </div>
            </Container>
        )
    }

}
