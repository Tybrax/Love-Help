import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => {
    return (
        <Container fluid className="footer">
            <footer>
                <Container>
                    <Row>
                        <Col className="d-flex justify-content-center mt-5">
                            <h4 className="mt-2">© 2020 Copyright : Bastien RATAT</h4>
                        </Col>
                        <Col className="d-flex justify-content-center mt-5">
                            <ul className="list-inline">
                                <li className="list-inline-item"><a href="https://openclassrooms.com/en/paths/104-full-stack-developer" className="text-center"><img src="https://pbs.twimg.com/profile_images/1067328449730224128/P7v1-6rV_400x400.jpg" alt="OpenClassrooms" width="50" /></a></li>
                                <li className="list-inline-item"><a href="https://www.linkedin.com/in/bastien-ratat/" className="text-center"><img src="https://mal-thonon.org/wp-content/uploads/2020/02/Logo-LinkedIn.jpg" alt="LinkedIn" width="50" /></a></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </Container>
    );
};

