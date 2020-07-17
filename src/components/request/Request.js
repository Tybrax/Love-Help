import React from 'react';
import { MapComponent } from './Map.js';
import { GeoSuggest } from './GeoSuggest.js';

export const Request = (props) => {
    return (
        <React.Fragment>
            <MapComponent />
            <GeoSuggest />
        </React.Fragment>
    )
};
