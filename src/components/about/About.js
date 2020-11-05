import React, { Suspense } from 'react';
import { Card, Container, Row, Col, Figure } from 'react-bootstrap';
import logoGreen from '../../images/logo_green.png';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

const Counter = React.lazy(() => import('../homepage/Count.js'));

const aboutTextOne = "Our platform was built in 2020 and aims at helping people during the coronavirus epidemic crisis. Indeed, the virus has impacted everyone's lifestyle and a lot of people have lost their jobs. In that context, I feel it would have been highly appreciated to build a platform to grow a strong commmunity around help requests."

const catchPhrase = "No matter what's your request, we believe there's always someone around to help you out."

const Loader = () => (
    <ReactLoading type="balls" color="green" height={'30%'} width={'30%'} />
);

export const About = () => {

    const titleColor = {
        color: '#086F00'
    };

    const today = new Date();
    const date = ("0" + (today.getMonth() + 1)).slice(-2) + '/' + ("0" + today.getDate()).slice(-2) + '/' + today.getFullYear();


    return (
        <div>
            <section>
                <Container fluid>
                    <Row>
                        <Col md={12} className='background_style'>
                            {/* Test */}
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
                            <Container>
                                <Row className='justify-content-center mt-5'>
                                    <Col xs={12} sm={12} md={12} lg={4} className='text-center'>
                                        <Figure className="d-flex align-items-center justify-content-center mt-5">
                                            <Figure.Image
                                                className="img-fluid"
                                                alt="logo"
                                                src={logoGreen}
                                                width="200"
                                                height="200"
                                            />
                                        </Figure>
                                        <h3><span style={titleColor} className="font-weight-bold">Love</span> & <span style={titleColor} className="font-weight-bold">Help</span>.</h3>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={4}>
                                        <Card border="light" style={{ width: '100%', borderRadius: '4px', marginRight: '2.5%', marginLeft: '2.5%', marginBottom: '15%' }}>
                                            <Card.Body>
                                                <Card.Title className="text-center" style={{ fontWeight: '700', lineHeight: '1.5em', height: '3em' }}>
                                                <h2 className="pt-3 pb-3 pr-3 pl-3  sub-title text-center text-uppercase">Our Charity</h2>
                                                </Card.Title>
                                                <Card.Text className='about-text text-justify p-3'>
                                                    {aboutTextOne}
                                                </Card.Text>
                                                <Card.Text className='about-text text-justify font-weight-bold p-3'>
                                                    {catchPhrase}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
};

