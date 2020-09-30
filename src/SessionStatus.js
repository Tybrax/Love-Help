import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Button, Container } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react'

export const SessionStatus = () => {
    const {user, setUser} = useContext(UserContext);

    const titleColor = {
        color: '#086F00'
    };

    if (!user) {
        return (
            <Container className="mt-4">
                <h6 className="session-info text-right mr-5 mb-5">Please <span style={titleColor} className="font-weight-bold">Login</span> or <span style={titleColor} className="font-weight-bold">Sign up</span>.</h6>
            </Container>
        )
    } else {
        return (
            <Container className="mt-4">
                <h5 className="session-info text-right mr-5">Welcome <span style={titleColor} className="font-weight-bold">{user.first_name} {user.last_name}</span>, check out the latest requests.</h5>
                <div className="mt-2 mb-3 d-flex  flex-row-reverse">
                    <h6 className="text-right mr-1" >Sign out</h6>
                    <Icon name='log out' />
                </div>
            </Container>
        )
    }
};

