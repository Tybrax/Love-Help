import React from 'react';
import { Container } from 'react-bootstrap';

const Counter = () => {
    return (
        <Container fluid className='count d-flex mx-auto align-items-center justify-content-center'>
            <h3 className='text-center'>Unfulfilled request : 3</h3>
        </Container>
    )
};

export default Counter;
