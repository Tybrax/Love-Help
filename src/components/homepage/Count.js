import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const requestEndPoint = 'http://localhost:3001/total'

const Counter = () => {

    const [count, setCount] = useState(0);

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

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
        <Container fluid className='count d-flex mx-auto align-items-center justify-content-center'>
            <h3 className='text-center'>Unfulfilled request ({ date }) : { count }</h3>
        </Container>
    )
};

export default Counter;
