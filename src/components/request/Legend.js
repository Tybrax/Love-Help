import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logoGreen from '../../images/logo_green.png';
import logoRed from '../../images/logo_red.png';

export const Legend = () => {
    return (
        <Container className="mt-3 mb-5">
            <h2 className="text-center nav_link" style={{ color: 'black' }}>Legend for requests markers</h2>
            <Row className='justify-content-center'>
                <Col md={5} className='container_legend mr-md-2' >
                    <Col xs={4} md={4}>
                        <figure>
                            <img src={logoRed} className="img_legend mt-md-4" alt="legendRed" />
                        </figure>
                    </Col>
                    <Col xs={8} md={8}>
                        <h5 className="mt-3 nav_link text-left" style={{ color: 'black' }}>One-time task</h5>
                        <p className="text-left">i.e: to help carry a piece of heavy furniture or feeding the cats.</p>
                    </Col>
                </Col>
                <Col md={5} className='container_legend_green ml-md-2' >
                    <Col xs={4} md={4}>
                        <figure>
                            <img src={logoGreen} className="img_legend mt-md-4" alt="legendGreen" />
                        </figure>
                    </Col>
                    <Col xs={8} md={8}>
                        <h5 className="mt-3 nav_link text-left" style={{ color: 'black' }}>Material need</h5>
                        <p className="text-left">i.e.: a homeless woman on your street who needs a blanket for winter.</p>
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}

export default Legend;
