import React from 'react';
import { MapComponent } from './Map.js';
import { GeoSuggest } from './GeoSuggest.js';
import { Legend } from './Legend.js';
/*import { RemoveRequest } from './RemoveRequest.js';*/
import { RequestDescription } from './RequestDescription.js';

export const Request = (props) => {
    return (
        <React.Fragment>
            <Legend />
            <MapComponent />
            <GeoSuggest />
            <RequestDescription />
        </React.Fragment>
    )
};
