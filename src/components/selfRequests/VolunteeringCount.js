import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { decodeToken } from '../../utils/decodeToken';
import axios from 'axios';
import { getVolunteers } from '../../utils/createVolunteer'

export const VolunteeringCount = () => {

    const [token, setToken] = useState(
        localStorage.getItem('userToken') || null
    )
    const currentUserId = decodeToken(token).user_id;

    const [count, setCount] = useState(0);

    useEffect(() => {
        let mounted = true;
        const volunteers = getVolunteers(token);
        volunteers.then((response) => {
            if (mounted) {
                let count = 0;
                for (const volunteer of response.data) {
                    if (volunteer.user_id === currentUserId) {
                        count += 1;
                    }
                }
                setCount(count)
            }
        })
        return () => mounted = false;
    }, [count])

    if (count == 1) {
        return (
                <h4>I helped {count} person</h4>
        )
    } else if (count == 0) {
        return (
                <h4>No one helped yet</h4>
        )

    } else {
        return (
                <h4>I helped {count} persons</h4>
        )
    }

}
