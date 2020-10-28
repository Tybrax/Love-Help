import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container, Alert } from 'react-bootstrap';

const getCount = 'http://localhost:3001/total'

const Counter = () => {

    const [count, setCount] = useState(0);
    const [countError, setCountError] = useState(false);

    useEffect(() => {
        axios.get(getCount)
        .then(response => {
            const responseData = response.data;
            setCount(responseData);
        })
        .catch((error) => {
            setCountError(true);
        })
    }, [count])

    return (
        <Fragment>
            <div>
                { countError && (
                    <Alert variant="danger" className="alert-fail text-center">
                        <h4>Temporary can't display request counter.</h4>
                    </Alert>
                )}
            </div>
            <Container className='count d-flex mx-auto align-items-center justify-content-center rounded-lg'>
                { (count <= 1 && count) ? (
                    <h4 style={{fontSize: '1rem'}} className='text-center'>{ count } unfulfilled request</h4>
                ) : (
                    <h4 style={{fontSize: '1rem'}} className='text-center'>{ count } unfulfilled requests</h4>
                )}
            </Container>
        </Fragment>
    )
};

export default Counter;
