import React from 'react';
import { Container } from 'react-bootstrap';

const Counter = (props) => {
    return (
        <Container fluid className='count d-flex mx-auto align-items-center justify-content-center'>
            <h3 className='text-center'>Unfulfilled request on { props.date } : x</h3>
        </Container>
    )
};

export default Counter;
