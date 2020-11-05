import React, { useContext, useState } from 'react';
import { decodeToken } from './utils/decodeToken';
import { UserContext } from './UserContext';
import { Container } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react'
import { logout } from './utils/logout';
import { Link } from "react-router-dom";

export const SessionStatus = () => {
    const {user, setUser} = useContext(UserContext);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const token = localStorage.getItem('userToken') || null;
    const firstName = decodeToken(token).first_name || null;
    const lastName = decodeToken(token).last_name || null;

    const handleClick = (event) => {
        event.preventDefault();
        logout();
        setUser(null);
        setIsLoggedOut(true);
    }

    if (!token) {
        return (
            <Container className="">
                <h6 className="session-info text-right my-auto mr-5 mb-5">
                    <Link to="/login">Sign in</Link>
                </h6>
            </Container>
        )
    } else {
        return (
            <Container className="mt-4">
                <div className="mr-3">
                    <h4 className="font-weight-bold username">{firstName} {lastName}</h4>
                </div>
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

