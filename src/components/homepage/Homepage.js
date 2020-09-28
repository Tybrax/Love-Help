import React, { useContext, useState, Fragment } from 'react';
import { UserContext } from '../../UserContext';

import Description from './Description.js';
import SignUp from './SignUp.js';
import LogIn from './LogIn.js';
import LogOut from './LogOut.js';
import { logout } from '../../utils/logout';

import Counter from './Count.js';
import { Container, Row, Col, Alert } from 'react-bootstrap';

import img0 from '../../images/img0.jpg';
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';

const description = {
    first: ['BE ACTIVE', img0,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'],
    second: ['LOVE OTHERS', img1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'],
    third: ['SHARE HELP', img2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.']
};

export const Homepage = () => {

    const { user, setUser } = useContext(UserContext);
    const [loggedOut, setLoggedOut] = useState(false);

    const signOut = (event) => {
        event.preventDefault();
        if (!loggedOut) {
            logout();
            setUser(null);
            setLoggedOut(true);
        }
        setTimeout(() => {
            setLoggedOut(false);
        }, 2000)
    }

    return (
        <React.Fragment>
            <Container className="mt-5">
                <Row className="mb-5">
                    <Col xs={12} sm={12} md={6}>
                        { loggedOut ? (
                            <Alert
                                variant={'dark'}
                                className="text-center"
                            >You successfully logged out.</Alert>
                        ) : (
                            <></>
                        )}
                        { user ? (
                            <LogOut handleClick={signOut} />
                        ) : (
                            <LogIn />
                        )}
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <SignUp />
                    </Col>
                </Row>
           </Container>
           <Counter className="mt-5" />
            <Container fluid className="mt-5">
                <Row className="mb-5 d-flex justify-content-around">
                    <Col xs={12} sm={12} md={4}>
                        <Description
                            title={description.first[0]}
                            image={description.first[1]}
                            text={description.first[2]}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={4}>
                        <Description
                            title={description.second[0]}
                            image={description.second[1]}
                            text={description.second[2]}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={4}>
                        <Description
                            title={description.third[0]}
                            image={description.third[1]}
                            text={description.third[2]}
                        />
                    </Col>
                </Row>
           </Container>
       </React.Fragment>
    )
};
