import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react'

import { SessionStatus } from '../../SessionStatus.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const NavbarElements = () => {
    const token = localStorage.getItem('userToken') || null;

    if (token) {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/request">REQUEST</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/messages"><Icon name='mail' /></Link>
                </li>
            </Fragment>
        )
    } else {
        return null;
    }
}

export const Navbar = (props) => {
    return (
        <Container>
            <Row>
                <Col className='justify-content-center'>
                <nav className="navbar navbar-expand-lg navbar-light navbar-static-top">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <img
                            src={props.logo}
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            alt="Bastien Ratat Logo"
                        />
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ml-5">
                            <li className="nav-item">
                                <Link className="nav-link ml-5" to="/">HOME</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">ABOUT</Link>
                            </li>
                            <NavbarElements />
                            <SessionStatus />
                        </ul>
                    </div>
                </nav>
                </Col>

            </Row>
        </Container>
    )
};
