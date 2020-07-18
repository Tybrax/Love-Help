import React from 'react';
import { MapComponent } from './Map.js';
import { GeoSuggest } from './GeoSuggest.js';
import { Legend } from './Legend.js';
import { RemoveRequest } from './RemoveRequest.js';

export const Request = (props) => {
    return (
        <React.Fragment>
            <Legend />
            <MapComponent />
            <GeoSuggest />
            <RemoveRequest />
        </React.Fragment>
    )
};
