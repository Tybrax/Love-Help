import React, { useState } from "react";
import axios from 'axios';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Geocode from 'react-geocode';
import { Button, Alert } from 'react-bootstrap';

Geocode.setApiKey("AIzaSyBT5euhpYYvpzGV7EkplwyF1AttF4jvr2A");
Geocode.setLanguage("en");
Geocode.setRegion("fr");

export const GeoSuggest = (props) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

    /*state for request*/
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");

    /*state for success alert*/
    const [successAlert, setSuccessAlert] = useState(false);
    const [successInformations, setSuccessInformations] = useState({});

    /*state for fail alert*/
    const [failAlert, setFailAlert] = useState(false);

    const handleSubmit = (event) => {

        if (successAlert) {
          setSuccessAlert(false);
        }

        if (failAlert) {
          setFailAlert(false);
        }

        const data = {
          title: title,
          request_type: type,
          description: description,
          location: `${coordinates.lat}, ${coordinates.lng}`
        }

        /*post data to API*/
        axios.post('http://localhost:3001/api/v1/requests', data)
        .then(res => {
          /*display a success alert if the record is created in the API*/
          const informationsObject = {
            title: res.data.title,
            type: res.data.request_type,
            description: res.data.description
          };
          setSuccessInformations(informationsObject);
          setSuccessAlert(true);
        })
        .catch(e => {
          /*display a failure alert if the record is created in the API*/
          setFailAlert(true);
        })

        /*prevent page to be refreshed after the form is submit*/
        event.preventDefault();
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
    { successAlert && (
      <Alert variant="success" className="alert-success">
        <h4>Your request has been sent successfully</h4>
      </Alert>
    )}

   { failAlert && (
      <Alert variant="danger" className="alert-fail">
        <h4>Your request was not sent. Please try again later.</h4>
      </Alert>
    )}

      <form onSubmit={handleSubmit}>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}

      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
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
              <select
                className="request-field mb-3"
                name="type"
                required="required"
                defaultValue={"DEFAULT"}
                onChange={event => setType(event.target.value)}
              >
                <option value="DEFAULT" disabled>Pick up a type below</option>
                <option value="One-time task">One-time task</option>
                <option value="Material need">Material need</option>
              </select>

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

                  {suggestions.map((suggestion, key) => {
                    const style = {
                      cursor: 'pointer',
                      backgroundColor: suggestion.active ? "#086F00" : "#fff",
                      color: suggestion.active ? "#fff" : "#086F00"
                    };

                    return (
                        <div key={key} className="autocomplete-dropdown-container mx-auto ">
                          <div {...getSuggestionItemProps(suggestion, { style })}>
                            {suggestion.description}
                          </div>
                        </div>
                    );
                  })}
                </div>
          </div>
        )}

      </PlacesAutocomplete>
      <Button type="submit">Submit</Button>
      </form>

    </div>
  );
}

export default GeoSuggest;
