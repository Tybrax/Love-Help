import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logoGreen from '../../images/logo_green.png';
import logoRed from '../../images/logo_red.png';

export const Legend = () => {
    return (
        <Container className="mt-5 mb-5">
            <h2 className="text-center sub-title">Legend for requests markers</h2>
            <Row>
                <Col xs={12} sm={12} md={12} lg={6} className="shadow">
                    <Row>
                        <Col>
                            <figure>
                                <img src={logoGreen} className="img-fluid d-flex mx-auto" alt="legendGreen" width="100" />
                            </figure>
                        </Col>
                        <Col className="mt-3">
                            <h5 className="sub-title text-center">Unfulfilled request</h5>
                            <p className="cat-text">People out there really need your help. Click on the marker in order to know more about what's going on.</p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className="shadow">
                    <Row>
                        <Col>
                            <figure>
                                <img src={logoRed} className="img-fluid d-flex mx-auto" alt="legendRed" width="100" />
                            </figure>
                        </Col>
                        <Col className="mt-3">
                            <h5 className="sub-title-alert text-center">Fulfilled request</h5>
                            <p className="cat-text">Someone else already took care of that request! That's great! Try to find out unfulfilled requests around you!</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Legend;
