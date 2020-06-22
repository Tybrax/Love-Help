import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

export const Navbar = (props) => {
    return (
        <Container fluid>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <img
                        src={props.logo}
                        width="200"
                        height="200"
                        className="d-inline-block align-top"
                        alt="Bastien Ratat Logo"
                    />
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ml-5">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/request">REQUEST</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">ABOUT</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </Container>
    )
};
