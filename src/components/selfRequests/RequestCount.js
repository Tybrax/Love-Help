import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { decodeToken } from '../../utils/decodeToken';
import { getRequests } from '../../utils/getRequests.js';

export const RequestCount = () => {

    const [token, setToken] = useState(
        localStorage.getItem('userToken') || null
    )
    const currentUserId = decodeToken(token).user_id;

    const [count, setCount] = useState(0);

    useEffect(() => {
        let mounted = true;
        const allRequests = getRequests(token);
        allRequests.then((response) => {
            if (mounted) {
                let count = 0;
                response.data.map((request) => {
                    if (request.user_id === currentUserId) {
                        count += 1;
                    }
                })
                setCount(count);
            }

        })
        return () => mounted = false;
    }, [count])

    if (count == 0) {
        return (
            <h4>No requests created</h4>
        )
    } else if (count == 1) {
        return (
            <h4>I created {count} request</h4>
        )
    } else {
        return (
            <h4>I created {count} requests</h4>
        )
    }


}
