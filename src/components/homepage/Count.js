import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Counter = (props) => {

    const [request, newRequest] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            /*GET request with Axios to refresh the counter of requests*/
        }, 2000);
    })

    return (
        <Container fluid className='count d-flex mx-auto align-items-center justify-content-center'>
            <h3 className='text-center'>Unfulfilled request ({ props.date }) : { request }</h3>
        </Container>
    )
};

export default Counter;
