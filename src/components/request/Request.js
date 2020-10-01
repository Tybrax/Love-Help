import React, { Fragment } from 'react';
import { MapComponent } from './Map.js';
import { GeoSuggest } from './GeoSuggest.js';
import { Legend } from './Legend.js';
import { RequestDescription } from './RequestDescription.js';
import { Container, Row, Col } from 'react-bootstrap';

import Counter from '../homepage/Count.js';
import Card from 'react-bootstrap/Card'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

const titleColor = {
    color: '#086F00'
};

const today = new Date();
const date = ("0" + (today.getMonth() + 1)).slice(-2) + '/' + ("0" + today.getDate()).slice(-2) + '/' + today.getFullYear();

export const Request = (props) => {
    return (
        <Fragment>
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
                        <Container>
                            <Row className='justify-content-center mt-5'>
                                <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
                                    <Legend />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col md={12} className='background_style_custom'>
                        <Container className='mb-4'>
                            <Row className='justify-content-center'>
                                <Col className='col_form' sm={12} md={8}>
                                    <MapComponent />
                                </Col>
                                <Col className='col_form' sm={12} md={4}>
                                <Card style={{margin: 0}} className='card_form' border="light">
                                    <GeoSuggest />
                                    <RequestDescription />
                                </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
};
