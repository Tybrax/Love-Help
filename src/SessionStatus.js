import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Button, Container } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react'
import { logout } from './utils/logout';

export const SessionStatus = () => {
    const {user, setUser} = useContext(UserContext);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        logout();
        setUser(null);
        setIsLoggedOut(true);
    }

    const titleColor = {
        color: '#086F00'
    };

    if (!user) {
        return (
            <Container className="">
                <h6 className="session-info text-right my-auto mr-5 mb-5">Please <span style={titleColor} className="font-weight-bold">Login</span> or <span style={titleColor} className="font-weight-bold">Sign up</span>.</h6>
            </Container>
        )
    } else {
        return (
            <Container className="mt-4">
                <h5 className="session-info text-right mr-5">Welcome <span style={titleColor} className="font-weight-bold">{user.first_name} {user.last_name}</span>.</h5>
                <div
                    className="mt-2 mb-3 d-flex  flex-row-reverse border rounded pt-2 px-1 signout"
                    onClick={handleClick}
                >
                    <h5 className="text-right mr-1 font-weight-bold" >Sign out</h5>
                    <Icon name='log out' />
                </div>
            </Container>
        )
    }
};

