import React from 'react';

import Description from './Description.js';
import SignUp from './SignUp.js';
import LogIn from './LogIn.js';
import Counter from './Count.js';
import { Container, Row, Col } from 'react-bootstrap';

import img0 from '../../images/img0.jpg';
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';

const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

const description = {
    first: ['BE ACTIVE', img0,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'],
    second: ['LOVE OTHERS', img1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'],
    third: ['SHARE HELP', img2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.']
};

export const Homepage = () => {
    return (
        <React.Fragment>
            <Container className="mt-5">
                <Row className="mb-5">
                    <Col xs={12} sm={12} md={6}>
                        <LogIn />
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <SignUp />
                    </Col>
                </Row>
           </Container>
           <Counter className="mt-5" date={date} />
            <Container fluid className="mt-5">
                <Row className="mb-5 d-flex justify-content-around">
                    <Col xs={12} sm={12} md={4}>
                        <Description
                            title={description.first[0]}
                            image={description.first[1]}
                            text={description.first[2]}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={4}>
                        <Description
                            title={description.second[0]}
                            image={description.second[1]}
                            text={description.second[2]}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={4}>
                        <Description
                            title={description.third[0]}
                            image={description.third[1]}
                            text={description.third[2]}
                        />
                    </Col>
                </Row>
           </Container>
       </React.Fragment>
    )
};
