import React from 'react';
import { Container } from 'react-bootstrap';

export const Message = ({ message, author, time }) => {

    if (author === 1) {
        return (
            <Container className="d-flex flex-row">
                <div className="blue-message mt-2 mb-2 p-2">
                    <div className="d-flex flex-row">
                        <h6 className="font-italic pl-3 pr-3">{time.slice(0, 9)}, {time.slice(11, 16)}</h6>
                    </div>
                    <div className="d-flex flex-row">
                        <h5 className="font-weight-bold pl-3 pr-3">{message}</h5>
                    </div>
                </div>
            </Container>
        )
    } else {
        return (
            <Container className="d-flex flex-row-reverse">
                <div className="green-message mb-4 p-2">
                    <div className="d-flex flex-row">
                        <h6 className="font-italic pl-3 pr-3">{time.slice(0, 9)}, {time.slice(11, 16)}</h6>
                    </div>
                    <div className="d-flex flex-row">
                        <h5 className="font-weight-bold pl-3 pr-3">{message}</h5>
                    </div>
                </div>
            </Container>
        )
    }

}
