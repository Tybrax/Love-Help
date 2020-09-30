import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

const NavbarElements = () => {
    const [user, setUser] = useState(false);

    if (!user) {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/request">REQUEST</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about">ABOUT</Link>
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
                            <Link className="nav-link" to="/">HOME</Link>
                        </li>
                        <NavbarElements />
                    </ul>
                </div>
            </nav>
        </Container>
    )
};
