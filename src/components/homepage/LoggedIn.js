import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { Container, Card } from 'react-bootstrap';
import { Description } from './Description';
import img3 from '../../images/img3.jpg';

export const LoggedIn = () => {

    const {user, setUser} = useContext(UserContext);

    return (
        <Container>
            <Card className="mb-5 shadow d-flex justify-content-around">
              <h3 className="d-flex justify-content-center align-items-center loggedin_title my-4">Latest requests available</h3>
              <Card.Img
                className="img-fluid"
                variant="top"
                src={img3}
              />
              <Card.Body>
                <a
                    href="/request"
                    className="cat-text stretched-link text-decoration-none card_link"
                >
                  Click on the map to get started by checking nearby requests.
                </a>
              </Card.Body>
            </Card>
        </Container>
    )
}
