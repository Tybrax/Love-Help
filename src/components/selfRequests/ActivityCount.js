import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { RequestCount } from './RequestCount';
import { VolunteeringCount } from './VolunteeringCount';

export const ActivityCount = () => {
    return (
        <Container className="activity-count">
            <Row>
                <Col xs={12} sm={12} md={6}>
                    <h3 className="text-center mt-3">Requests</h3>
                    <Container className="request__count d-flex justify-content-center align-items-center">
                        <RequestCount />
                    </Container>
                </Col>
                <Col xs={12} sm={12} md={6}>
                    <h3 className="text-center mt-3">Volunteering</h3>
                    <Container className="request__count d-flex justify-content-center align-items-center">
                        <VolunteeringCount />
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}
