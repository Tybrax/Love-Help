import React, { useContext, useState, Fragment } from 'react';
import { UserContext } from '../../UserContext';
import { usePosition } from 'use-position';

import { Jumbotron } from 'react-bootstrap';
import Description from './Description.js';
import SignUp from './SignUp.js';
import LogIn from './LogIn.js';
import LogOut from './LogOut.js';
import { LoggedIn } from './LoggedIn';
import { logout } from '../../utils/logout';
import { decodeToken } from '../../utils/decodeToken';
import { setPosition } from '../../utils/setPosition';

import Counter from './Count.js';
import { Container, Row, Col, Alert } from 'react-bootstrap';

import img0 from '../../images/img0.jpg';
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

const description = {
    first: ['BE ACTIVE', img0, 'Meet your neighbors by helping them. Go out and discover new people instead of staying passively in your place. Turn off Netflix and write your own adventure through helping people in need. ', <FontAwesomeIcon size="lg" icon={['fas', 'hands-helping']} fixedWidth />],
    second: ['LOVE OTHERS', img1, 'Give love to your community and receive all the benefit from helping others : wonderful friendship & pride. Find out who needs help nearby using our amazing application', <FontAwesomeIcon size="lg" icon={['fas', 'heart']} fixedWidth />],
    third: ['SHARE YOUR REQUEST', img2, 'Are you shorthanded with anything? Do you have to move out your place but lack handful people to help you out? We build this application just for you so that you find the right person for the right thing.', <FontAwesomeIcon size="lg" icon={['fas', 'globe-americas']} fixedWidth />]
};

export const Homepage = () => {

    const today = new Date();
    const date = ("0" + (today.getMonth() + 1)).slice(-2) + '/' + ("0" + today.getDate()).slice(-2) + '/' + today.getFullYear();

    const { user, setUser } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState(
        decodeToken(localStorage.getItem('userToken')) || null
    )
    const [loggedOut, setLoggedOut] = useState(false);

    const { latitude, longitude, error } = usePosition();
    const userPosition = setPosition(latitude, longitude, error);

    return (
        <React.Fragment>
            <Jumbotron>
                <h1 className="jumbotron-title">Love & Help</h1>
            </Jumbotron>
            <Container className="mt-5">
                <Row className="mb-5">
                    {user ? (
                        <React.Fragment>
                            <Col xs={12} sm={12} md={6}>
                                <LoggedIn />
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <div>SOME STUFFS</div>
                            </Col>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Col xs={12} sm={12} md={6}>
                                <LogIn />
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <SignUp />
                            </Col>
                        </React.Fragment>
                    )}
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col md={12} className='background_style'>

                        <Container>
                            <Row className='justify-content-center'>
                                <Col className='contribute' md={12}>
                                    <Col md={8}>
                                        <h4 style={{ fontSize: '1.2rem', color: 'black' }} className="session-info subtitle text-center mt-2"><FontAwesomeIcon size="lg" icon={['fas', 'life-ring']} fixedWidth /> Please help us reducing the number of unfulfilled request on {date}</h4>
                                    </Col>
                                    <Col md={4}>
                                        <Counter className="mt-5" />
                                    </Col>
                                </Col>
                            </Row>
                        </Container>

                        <Container fluid className="mt-3">
                            <Row className="mb-5 d-flex justify-content-around">
                                <Col xs={12} sm={12} md={4} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                    <Description
                                        title={description.first[0]}
                                        image={description.first[1]}
                                        text={description.first[2]}
                                        icon={description.first[3]}
                                    />
                                </Col>
                                <Col xs={12} sm={12} md={4} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                    <Description
                                        title={description.second[0]}
                                        image={description.second[1]}
                                        text={description.second[2]}
                                        icon={description.second[3]}
                                    />
                                </Col>
                                <Col xs={12} sm={12} md={4} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                    <Description
                                        title={description.third[0]}
                                        image={description.third[1]}
                                        text={description.third[2]}
                                        icon={description.third[3]}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
};
