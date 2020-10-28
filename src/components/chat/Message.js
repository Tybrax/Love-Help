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

export const Message = ({ message, author, time }) => {

    if (author == 1) {
        return (
            <Container className="d-flex flex-row">
                <div className="blue-message mt-2 mb-2 p-2">
                    <div className="d-flex flex-row">
                        <h6 className="font-italic">{time.slice(0, 9)}, {time.slice(11, 16)}</h6>
                    </div>
                    <div className="d-flex flex-row">
                        <h5 className="font-weight-bold">{message}</h5>
                    </div>
                </div>
            </Container>
        )
    } else {
        return (
            <Container className="d-flex flex-row-reverse">
                <div className="green-message mb-4 p-2">
                    <div className="d-flex flex-row-reverse">
                        <h6 className="font-italic">{time.slice(0, 9)}, {time.slice(11, 16)}</h6>
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <h5 className="font-weight-bold">{message}</h5>
                    </div>
                </div>
            </Container>
        )
    }

}
