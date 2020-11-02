import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

export const Header = () => {
    return (
        <Container>
            <Jumbotron>
                <h1 className="me__header">Dashboard</h1>
            </Jumbotron>
        </Container>
    )
};
