import React from 'react';
import { MapComponent } from './Map.js';
import { GeoSuggest } from './GeoSuggest.js';
import { Legend } from './Legend.js';
import { RequestDescription } from './RequestDescription.js';
import { Chat } from '../chat/Chat.js';

export const Request = (props) => {
    return (
        <React.Fragment>
            <Legend />
            <MapComponent />
            <GeoSuggest />
            <RequestDescription />
            {/*<Chat />*/}
        </React.Fragment>
    )
};
