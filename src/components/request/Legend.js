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
                                <img src={logoRed} className="img-fluid d-flex mx-auto" alt="legendRed" width="100" />
                            </figure>
                        </Col>
                        <Col className="mt-3">
                            <h5 className="sub-title-alert text-center">One-time task</h5>
                            <p className="cat-text">i.e., to help carry a piece of heavy furniture or feeding the cats.</p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className="shadow">
                    <Row>
                        <Col>
                            <figure>
                                <img src={logoGreen} className="img-fluid d-flex mx-auto" alt="legendGreen" width="100" />
                            </figure>
                        </Col>
                        <Col className="mt-3">
                            <h5 className="sub-title text-center">Material need</h5>
                            <p className="cat-text">i.e., a homeless woman on your street who needs a blanket for winter or some rice to cook a risotto.</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Legend;
