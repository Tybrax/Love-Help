import React, { useState, useContext } from "react";
import axios from 'axios';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Geocode from 'react-geocode';
import { Button, Alert } from 'react-bootstrap';
import { decodeToken } from '../../utils/decodeToken';

import Form from 'react-bootstrap/Form'
import { UserContext } from '../../UserContext';
import { postRequest } from '../../utils/postRequest.js';

Geocode.setApiKey("AIzaSyCn2iRQCK8yWQ8T9zgEPVeCMFNf5YJNMGw");

Geocode.setLanguage("en");
Geocode.setRegion("fr");

export const GeoSuggest = (props) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  /*user context*/
  const { user, setUser } = useContext(UserContext);

  const token = localStorage.getItem('userToken') || null;
  const userInformations = decodeToken(token);

  /*state for request*/
  const [title, setTitle] = useState("");
  const [type, setType] = useState("one-time task");
  const [description, setDescription] = useState("");

  /*state for success alert*/
  const [successAlert, setSuccessAlert] = useState(false);
  const [successInformations, setSuccessInformations] = useState({});

  /*state for fail alert*/
  const [requestError, setRequestError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (successAlert) {
      setSuccessAlert(false);
    }

    if (requestError) {
      setRequestError(false);
    }

    /*remember to active API keys from Google Developer console*/
    const requestData = {
      user_id: userInformations.user_id,
      title: title,
      request_type: type,
      description: description,
      location: `${coordinates.lat}, ${coordinates.lng}`
    }

    /*post data to API*/
    const promise = postRequest(requestData, token);
      promise.then(res => {
        /*display a success alert if the record is created in the API*/
        const informationsObject = {
          title: res.data.title,
          type: res.data.request_type,
          description: res.data.description
        };
        console.log(informationsObject);
        setSuccessInformations(informationsObject);
        setSuccessAlert(true);
      })
      .catch(e => {
        /*display a failure alert if the record is created in the API*/
        setRequestError(true);
      })
  }

  const handleSelect = (value) => {
    Geocode.fromAddress(value)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setAddress(value);
        setCoordinates({ lat, lng })
      })
  };

  return (
    <div className="text-center">
      { successAlert && (
        <Alert variant="success" className="alert-success">
          <h4>Your request has been sent successfully</h4>
        </Alert>
      )}

      { requestError && (
        <Alert variant="danger" className="alert-fail">
          <h4>Your Description is too long, please be more concise!</h4>
        </Alert>
      )}

      <h3 style={{fontSize: '1.5rem', marginTop: '4%'}} className='nav_link'>Add a request</h3>
      <Form style={{ padding: '1rem'}} onSubmit={handleSubmit}>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}

        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <Form.Group controlId="formRequestType">
                <Form.Label>Request type</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  required="required"
                  onChange={event => setType(event.target.value)}
                  defaultValue="Please select a type"
                >
                  <option disabled >Please select a type</option>
                  <option value="one-time task">One-time task</option>
                  <option value="material need">Material need</option>
                </Form.Control>
                <Form.Text className="text-muted">
                  Please select from the dropdown menu.
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formRequestTitle">
                <Form.Label>Request title</Form.Label>
                <Form.Control
                  name="title"
                  required="required"
                  onChange={event => setTitle(event.target.value)}
                  value={title} type="text"
                  placeholder="Enter request title"
                />
              </Form.Group>

              <Form.Group controlId="formRequestDescription">
                <Form.Label>Request description</Form.Label>
                <Form.Control
                  as='textarea'
                  type="text-area"
                  placeholder="Enter request description"
                  name="description"
                  required="required"
                  onChange={event => setDescription(event.target.value)}
                  value={description}
                />
              </Form.Group>

              <Form.Group controlId="formRequestAddress">
                <Form.Label>Request Address</Form.Label>
                <Form.Control
                  type="text"
                  {...getInputProps({ placeholder: "Type your address" })}
                />

                <div className='autocomplete-dropdown-container'>
                  {loading && <div style={{backgroundColor: '#ffffff', cursor: 'pointer', paddingLeft: '9px', paddingRight: '9px'}}>Searching...</div>}

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
              </Form.Group>

            </div>
          )}

        </PlacesAutocomplete>
        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default GeoSuggest;
