import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { Sidebar } from './Sidebar';
import { ChatRoom } from './ChatRoom';

export const Chat = () => {
    return (
        <Container>
            <Row>
                <Col xs={12} sm={12} md={4}>
                    <Sidebar />
                </Col>
                <Col xs={12} sm={12} md={8}>
                    <ChatRoom />
                </Col>
            </Row>
        </Container>
    )
}
