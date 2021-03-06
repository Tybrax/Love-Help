import React, { useContext, lazy, Suspense } from 'react';
import { UserContext } from '../../UserContext';
import { usePosition } from 'use-position';

import { Jumbotron } from 'react-bootstrap';
import Description from './Description.js';
import { LogIn } from './LogIn.js';

import { setPosition } from '../../utils/setPosition';

import { Container, Row, Col } from 'react-bootstrap';
import ReactLoading from 'react-loading';

import img0 from '../../images/img0.jpg';
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';
import loggedin from '../../images/loggedin.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

const LoggedIn = lazy(() => import('./LoggedIn'));
const SignUp = lazy(() => import('./SignUp'));
const Counter = lazy(() => import('./Count.js'));

const Loader = () => (
    <ReactLoading type="balls" color="green" height={'30%'} width={'30%'} />
);


const description = {
    first: ['BE ACTIVE', img0, 'Meet your neighbors by helping them. Go out and discover new people instead of staying passively in your place. Turn off Netflix and write your own adventure through helping people in need. ', <FontAwesomeIcon size="lg" icon={['fas', 'hands-helping']} fixedWidth />],
    second: ['LOVE OTHERS', img1, 'Give love to your community and receive all the benefit from helping others : wonderful friendship & pride. Find out who needs help nearby using our amazing application', <FontAwesomeIcon size="lg" icon={['fas', 'heart']} fixedWidth />],
    third: ['SHARE YOUR REQUEST', img2, 'Are you shorthanded with anything? Do you have to move out your place but lack handful people to help you out? We build this application just for you so that you find the right person for the right thing.', <FontAwesomeIcon size="lg" icon={['fas', 'globe-americas']} fixedWidth />]
};

export const Homepage = () => {

    const today = new Date();
    const date = ("0" + (today.getMonth() + 1)).slice(-2) + '/' + ("0" + today.getDate()).slice(-2) + '/' + today.getFullYear();

    const { user, setUser } = useContext(UserContext);
    const { latitude, longitude, error } = usePosition();
    const userPosition = setPosition(latitude, longitude, error);

    return (
        <React.Fragment>
            <Jumbotron>
                <h1 className="jumbotron-title">Love & Help</h1>
            </Jumbotron>
            <Container>
                <Row className='justify-content-center'>
                    <Col className='contribute' md={12}>
                        <Col md={8}>
                            <h4 style={{ fontSize: '1.2rem', color: 'black' }} className="session-info subtitle text-center mt-2"><FontAwesomeIcon size="lg" icon={['fas', 'life-ring']} fixedWidth /> Please help us reducing the number of unfulfilled request on {date}</h4>
                        </Col>
                        <Col md={4}>
                            <Suspense fallback={Loader()}>
                                <Counter className="mt-5" />
                            </Suspense>
                        </Col>
                    </Col>
                </Row>
            </Container>
            <Container className="mt-5">
                <Row className="mb-5">
                    {user ? (
                        <React.Fragment>
                            <Col xs={12} sm={12} md={6}>
                                <Suspense fallback={Loader()}>
                                    <LoggedIn />
                                </Suspense>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <Container>
                                    <h3 className="font-weight-bold text-center mb-4">Welcome on Love&Help</h3>
                                    <article>
                                        <p className="text-justify loggedin__text mb-4">We're delighted to see you using our awesome platform. You're here to help and to be helped! Click on the REQUEST tab and start helping your neightborhood.</p>
                                    </article>
                                    <img src={loggedin} className="img-fluid" />
                                </Container>
                            </Col>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Col xs={12} sm={12} md={6}>
                                <LogIn />
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <Suspense fallback={Loader()}>
                                    <SignUp />
                                </Suspense>

                            </Col>
                        </React.Fragment>
                    )}
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col md={12} className='background_style'>

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
