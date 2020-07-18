import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export const RemoveRequest = () => {
    const [request, setRequest] = useState({})
    const endpoint = 'http://localhost:3001/api/v1/requests/13';

    useEffect(() => {
        setTimeout(() => {
            axios.get('endpoint')
            .then(response => {
                setRequest(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }, 500)
    })

    const handleClick = () => {
        setTimeout(() => {
            axios.put(
                endpoint,
                {
                    title: request.title,
                    request_type: request.request_type,
                    description: request.description,
                    location: request.location,
                    fulfilled: true
                }
            )
        }, 500)
    }

    return (
        <Fragment>
            <Button onClick={handleClick}>REQUEST 13 FULFILLED</Button>
                <p>{request.id}</p>
                <p>{request.title}</p>
                <p>{request.request_type}</p>
                <p>{request.description}</p>
                <p>{request.location}</p>
        </Fragment>
    )
}

export default RemoveRequest;
