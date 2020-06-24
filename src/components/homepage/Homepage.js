import React from 'react';
import Description from './Description.js';
import SignUp from './SignUp.js';
import Counter from './Count.js';
import { Container, Row, Col } from 'react-bootstrap';

export const Homepage = () => {
    return (
        <React.Fragment>
            <Container className="mt-5">
                <Row className="mb-5">
                    <Col xs={12} sm={12} md={6}>
                        <Description />
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <SignUp />
                    </Col>
                </Row>
           </Container>
           <Counter className="mt-5" />
       </React.Fragment>
    )
};
