import React from 'react';
import { Container, Row, Col, Figure } from 'react-bootstrap';
import Counter from '../homepage/Count.js';
import logo from '../../images/logo.png';

export const About = () => {
    return (
        <div>
        <section>
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={4}>
                        <h2 className="sub-title text-center">LOREM IPSUM</h2>
                        <p className="pt-3 pb-3 pr-3 pl-3 text-justify cat-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4}>
                        <figure>
                            <img src="https://pouncedigital.com.au/wp-content/uploads/2018/09/community-words.jpg" alt="community" className="img-fluid"/>
                        </figure>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4}>
                        <h2 className="sub-title text-center text-uppercase">enterprise organization</h2>
                        <p className="pt-3 pb-3 pr-3 pl-3 text-justify cat-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                    </Col>
                </Row>
            </Container>
            <Counter />
            <Figure className="d-flex align-items-center justify-content-center">
                <Figure.Image
                    className="img-fluid"
                    alt="logo"
                    src={logo}
                />
            </Figure>
        </section>
    </div>
    )
};

