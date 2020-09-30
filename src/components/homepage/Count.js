import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const requestEndPoint = 'http://localhost:3001/total'

const Counter = () => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            axios.get(requestEndPoint)
            .then(response => {
                const responseData = response.data;
                setCount(responseData);
            })
            .catch(e => {
                console.log(e)
            })
        }, 1000);
    })

    return (
        <Container className='count d-flex mx-auto align-items-center justify-content-center rounded-lg'>
            { count <= 1  ? (
                <h3 className='text-center'>Unfulfilled request : { count }</h3>
            ) : (
                <h3 className='text-center'>Unfulfilled requests : { count }</h3>
            )}
        </Container>
    )
};

export default Counter;
