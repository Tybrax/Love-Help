import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { getRequest } from '../../utils/getRequest.js';
import { getUser } from '../../utils/getChats.js';
import { getVolunteers } from '../../utils/createVolunteer.js';
import { decodeToken } from '../../utils/decodeToken';

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

export const Volunteering = () => {

    const [token, setToken] = useState(
        localStorage.getItem('userToken') || null
    )
    const currentUserId = decodeToken(token).user_id;

    const [volunteering, setVolunteering] = useState([]);

    useEffect(() => {
        let mounted = true;

        const allVolunteers = getVolunteers(token);
        allVolunteers.then((response) => {
            if (mounted) {
                const requestsIdForVolunteering = [];
                response.data.map((volunteer) => {
                    if (currentUserId === volunteer.user_id) {
                        requestsIdForVolunteering.push(volunteer.request_id);
                    }
                })
                const requestInformations = [];
                for (const requestId of requestsIdForVolunteering) {
                    const request = getRequest(token, requestId);
                    request.then((response) => {
                            const requestInfo = {
                                id: requestId,
                                requestTitle: response.data.title,
                                requestType: response.data.request_type,
                                requestDescription: response.data.description,
                                requestDate: response.data.created_at,
                                requestStatus: response.data.status
                            };
                            const requesterName = getUser(response.data.user_id);
                            requesterName.then((response) => {
                                requestInfo.requester = response;
                                requestInformations.push(requestInfo);

                            })

                    })
                }
                setVolunteering(requestInformations);
            }
        })


        return () => mounted = false;
    }, [])

    return (
        <Container className="d-block">
            {volunteering.map((request, index) => (
                <Card key={index} className="d-flex justify-content-center request__card">
                    <div className="request__title ">
                        <h4 className="p-2">{request.requestTitle}</h4>
                        <h5 className="font-italic p-2">{request.requestDate.slice(0, 10)} by {request.requester}</h5>
                    </div>
                    <h5
                        className="font-weight-bold mt-3 pl-3"
                        style={(request.requestType === 'one-time task' ? redStyle : greenStyle)}
                    >
                        {request.requestType.slice(0, 1).toUpperCase()}{request.requestType.slice(1,)}
                    </h5>
                    <p className="text-justify pl-3 pr-3">{request.requestDescription}</p>
                    <h5
                        className="font-weight-bold pl-3 mb-5"
                        style={(request.requestStatus === 'unfulfilled') ? statusStyle.unfulfilled : (request.requestStatus === 'fulfilled') ? statusStyle.fulfilled : statusStyle.pending}
                    >
                        {request.requestStatus.slice(0, 1).toUpperCase()}{request.requestStatus.slice(1,)}
                    </h5>
                </Card>
            ))}
        </Container>
    )
};
