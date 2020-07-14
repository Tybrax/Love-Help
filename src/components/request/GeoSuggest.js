import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Geocode from 'react-geocode';

Geocode.setApiKey("AIzaSyBT5euhpYYvpzGV7EkplwyF1AttF4jvr2A");
Geocode.setLanguage("en");
Geocode.setRegion("fr");

export const GeoSuggest = (props) => {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleSelect =  (value) => {
    Geocode.fromAddress(value)
    .then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setAddress(value);
      setCoordinates({lat, lng})
    })
  };

  return (
    <div className="text-center mt-3 mb-3">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>{address ? `Location : ${address}` : null}</p>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>
            <input {...getInputProps({ placeholder: "Type your address" })} />

            <div>
              {loading ? <div>loading...</div> : null}

              {suggestions.map((suggestion, index) => {
                const style = {
                  cursor: 'pointer',
                  backgroundColor: suggestion.active ? "#086F00" : "#fff",
                  color: suggestion.active ? "#fff" : "#086F00"
                };

                return (
                  <ul className="list-unstyled">
                    <li key={suggestion.index} {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default GeoSuggest;
