import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { Sidebar } from './Sidebar';
import { ChatRoom } from './ChatRoom';
import { Redirect } from 'react-router-dom';

export const Chat = () => {

    const token = localStorage.getItem('userToken') || null;

    if (token) {
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
    } else {
        return (
            <Redirect to="/" />
        )
    }
}
