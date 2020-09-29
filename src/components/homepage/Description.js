import React from 'react';
import { Card } from 'react-bootstrap';

export const Description = (props) => {
    return (
        <Card className="mb-5 shadow d-flex justify-content-around">
          <Card.Title className="d-flex justify-content-center align-items-center sub-title">{props.title}</Card.Title>
          <Card.Img
            className="img-fluid"
            variant="top"
            src={props.image}
          />
          <Card.Body>
            <Card.Text className="cat-text">
              {props.text}
            </Card.Text>
          </Card.Body>
        </Card>
    );
}

export default Description;
