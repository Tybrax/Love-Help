import React from 'react';
import Description from './Description.js';
import SignUp from './SignUp.js';
import Counter from './Count.js';
import { Container, Row, Col } from 'react-bootstrap';

export const Homepage = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Description />
                </Col>
                <Col>
                    <SignUp />
                </Col>
            </Row>
            <Counter />
       </Container>
    )
};
