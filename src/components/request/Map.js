import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'

const Map = () => {
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat:43.294640, lng: 5.368660 }}
        />
    );
}

const WrappedMap = withGoogleMap(Map);

export const MapComponent = () => {
    return (
        <div className="mx-auto" style={{width: '100vh', height: '100vh'}}>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

