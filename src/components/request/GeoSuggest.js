import React, { useState } from "react";
import axios from 'axios';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Geocode from 'react-geocode';
import { Button } from 'react-bootstrap';

Geocode.setApiKey("AIzaSyBT5euhpYYvpzGV7EkplwyF1AttF4jvr2A");
Geocode.setLanguage("en");
Geocode.setRegion("fr");

export const GeoSuggest = (props) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        const data = {
          title: title,
          request_type: type,
          description: description,
          location: `${coordinates.lat}, ${coordinates.lng}`
        }
        console.log(data);
        axios.post('http://localhost:3001/api/v1/requests', data)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        })
    }

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
      <form onSubmit={handleSubmit}>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}

      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/*Render data for test*/}
            <p>{address ? `Location : ${address}` : null}</p>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>

            <div>
              <h5>Request title</h5>
              <input
                className="request-field mb-3"
                type="text"
                name="title"
                required="required"
                onChange={event => setTitle(event.target.value)}
                value={title}
              />
            </div>
            <div>
              <h5>Request type</h5>
              <input
                className="request-field mb-3"
                type="text"
                name="title"
                required="required"
                onChange={event => setType(event.target.value)}
                value={type}
              />
            </div>
            <div>
              <h5>Request description</h5>
              <textarea
                className="request-field mb-3"
                name="description"
                required="required"
                onChange={event => setDescription(event.target.value)}
                value={description}
              >
                Describe your request in no more than 300 characters
              </textarea>
            </div>

              {/*form input & droplist*/}
              <h5>Request address</h5>

                <input className="request-field" {...getInputProps({ placeholder: "Type your address" })} />

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
      <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default GeoSuggest;
