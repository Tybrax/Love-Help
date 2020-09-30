import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logoGreen from '../../images/logo_green.png';
import logoRed from '../../images/logo_red.png';

export const Legend = () => {
    return (
        <Container className="mt-3 mb-5">
            <h2 className="text-center sub-title" style={{color: 'black'}}>Legend for requests markers</h2>
            <Row>
                {/* test */}
                <Col md={6}>

                        <div className='container_legend' style={{minHeight: '15vh'}}>
                            <figure>
                                <img src={logoRed} className="img_legend" alt="legendRed" />
                            </figure>
                            <div style={{marginLeft: '-20%'}}>
                                <h5 className="ml-5 sub-title-alert text-left mt-4" style={{color: 'black', fontWeight: 500}}>One-time task</h5>
                                <p className="cat-text text-left">i.e: to help carry a piece of heavy furniture or feeding the cats.</p>
                            </div>
                        </div>
                </Col>
                <Col md={6}>
                        <div className='container_legend_green' style={{minHeight: '15vh'}}>
                            <figure>
                                <img src={logoGreen} className="img_legend" alt="legendRed" />
                            </figure>
                            <div style={{marginLeft: '-20%'}}>
                                <h5 className="ml-5 sub-title text-left mt-4" style={{color: 'black'}}>Material need</h5>
                                <p className="cat-text text-left">i.e.: a homeless woman on your street who needs a blanket for winter.</p>
                            </div>
                        </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Legend;
