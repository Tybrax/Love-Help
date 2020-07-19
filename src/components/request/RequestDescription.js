import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const requestsEndpoint = 'http://localhost:3001/api/v1/requests';

export const RequestDescription = () => {
    /*Take each help request properties and values as an object and append it to the new state*/
    const [requests, setRequests] = useState([]);

    /*Get requests data from the the endpoint every two seconds*/
    useEffect(() => {
        setTimeout(() => {
            axios.get(requestsEndpoint)
            .then(res => {
                const requestsData = res.data;
                const listOfRequests = [];
                requestsData.map(request => {
                    const requestSingleObject = {
                        id: request.id,
                        title: request.title,
                        request_type: request.request_type,
                        description: request.description,
                        location: request.location,
                        fulfilled: request.fulfilled
                    }
                    listOfRequests.push(requestSingleObject);
                })
                setRequests(listOfRequests);
            })
            .catch(error => {
                console.log(error);
            })
        },
        2000)
    })

    const updateStatus = (id) => {
        axios.put(
            `http://localhost:3001/api/v1/requests/${id}`,
            {
                fulfilled: true
            }
        )
    }

    const destroyRequest = (id) => {
        axios.delete(
            `http://localhost:3001/api/v1/requests/${id}`,
        )
    }

    return (
        <Container fluid className="mt-5 mb-5">
            <section className="ml-5 mr-5">
                    {requests.map((request) => (
                        <div key={request.id} className="mt-3 mb-3">
                            <h4>{request.title} | {request.request_type}</h4>
                            <p className="cat-text">{request.description}</p>
                            <p className="cat-text">{request.location} | {request.fulfilled ? "fulfilled" : "unfulfilled"}</p>
                            <Button
                                className="mr-3 btn-dark"
                                onClick={() => {updateStatus(request.id)}}
                            >
                                Turn to fulfilled
                            </Button>
                            <Button
                                className="btn-dark"
                                onClick={() => {destroyRequest(request.id)}}
                            >
                                Remove request
                            </Button>
                            <hr/>
                        </div>
                    ))
                    }

            </section>
        </Container>
    )
}

export default RequestDescription;
