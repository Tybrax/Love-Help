import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const requestEndPoint = 'http://localhost:3001/api/v1/requests'

const Counter = (props) => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            axios.get(requestEndPoint)
            .then(response => {
                const responseData = response.data;
                let fulfilledRequest = 0;
                responseData.map((res) => {
                    if (res.fulfilled == false) {
                        fulfilledRequest++;
                    }
                })
                setCount(fulfilledRequest);
            })
            .catch(e => {
                console.log(e)
            })
        }, 200);
    })

    return (
        <Container fluid className='count d-flex mx-auto align-items-center justify-content-center'>
            <h3 className='text-center'>Unfulfilled request ({ props.date }) : { count }</h3>
        </Container>
    )
};

export default Counter;
