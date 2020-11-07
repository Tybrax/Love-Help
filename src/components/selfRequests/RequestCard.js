import React, { useState, useEffect } from 'react';
import { getUser } from '../../utils/getChats.js';
import { Card, Alert, Container, Button } from 'react-bootstrap';
import { fulfillRequest, unfulfillRequest, pendingRequest } from '../../utils/updateRequestStatus';

const redStyle= {
    color: '#c70039'
};

const greenStyle= {
    color: '#086F00'
};

const statusStyle = {
    fulfilled: {
        color: '#086F00'
    },
    unfulfilled: {
        color: 'red'
    },
    pending: {
        color: 'orange'
    }
}

export const RequestCard = ({ requestTitle, requestDate, requestType, requestStatus, requesterId, requestDescription, requestId }) => {

    const [token, setToken] = useState(
        localStorage.getItem('userToken') || null
    )

    const [requesterName, setRequesterName] = useState('');
    const [nameError, setNameError] = useState(false);

    useEffect(() => {
        let mounted = true;
        const request = getUser(requesterId);
        request.then((response) => {
            if (mounted) {
                setRequesterName(response);
            }
        })
        .catch((error) => {
            setNameError(true);
        })
        return () => mounted = false;
    }, [requesterName])

    return (
        <div>
            {(nameError == false) ? (
                <Container className="d-block">
                    <Card className="request__card d-flex justify-content-center m-3">
                        <div className="request__title ">
                            <h4 className="p-2">{requestTitle}</h4>
                            <h5 className="font-italic p-2">{requestDate.slice(0, 10)} by {requesterName}</h5>
                        </div>
                        <h5
                            className="font-weight-bold mt-3 pl-3"
                            style={(requestType === 'one-time task' ? redStyle : greenStyle)}
                        >
                            {requestType.slice(0, 1).toUpperCase()}{requestType.slice(1,)}
                        </h5>
                        <p className="text-justify pl-3 pr-3">{requestDescription}</p>
                        <h5
                            className="font-weight-bold pl-3"
                            style={(requestStatus === 'unfulfilled') ? statusStyle.unfulfilled : (requestStatus === 'fulfilled') ? statusStyle.fulfilled : statusStyle.pending}
                        >
                            {requestStatus.slice(0, 1).toUpperCase()}{requestStatus.slice(1,)}
                        </h5>
                        <div className="d-flex justify-content-center mt-3 mb-3">
                            <button
                                className="update__button m-2"
                                style={{backgroundColor: '#086F00'}}
                                onClick={() => fulfillRequest(requestId, token)}
                            >
                                Fulfill
                            </button>
                            <button
                                className="update__button m-2"
                                style={{backgroundColor: 'red'}}
                                onClick={() => unfulfillRequest(requestId)}
                            >
                                Unfulfill
                            </button>
                            <button
                                className="update__button m-2"
                                style={{backgroundColor: 'orange'}}
                                onClick={() => pendingRequest(requestId)}
                            >
                                Pending
                            </button>
                        </div>
                    </Card>
                </Container>
            ) : (
                <Alert variant="danger" className="alert-fail text-center">
                    <h4>Can't display requester.</h4>
                </Alert>
            )}
        </div>
    )
}
