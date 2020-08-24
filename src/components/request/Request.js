import React, { Fragment } from 'react';
import { MapComponent } from './Map.js';
import { GeoSuggest } from './GeoSuggest.js';
import { Legend } from './Legend.js';
import { RequestDescription } from './RequestDescription.js';
import { Chat } from './Chat/Chat.js';
import { Container, Row, Col } from 'react-bootstrap';

export const Request = (props) => {
    return (
        <Fragment>
            <Legend />
            <MapComponent />
            <GeoSuggest />
            <RequestDescription />
        </Fragment>
    )
};
