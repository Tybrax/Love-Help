import React, { useState, useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';
import { UserContext } from '../../UserContext';
import jwt_decode from 'jwt-decode';
import { Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

/*Validations schemas*/
const Schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
});

const logInURL = `${process.env.REACT_APP_BASE_URL}/login`;
const config = {
  headers: {
    'Content-type': 'application/json'
  }
};

export const LogIn = () => {

  /*CREATE CONTEXT FOR USER DATA*/
  const { user, setUser } = useContext(UserContext);

  const [hasError, setHasError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem('userToken') || null
  )

  const handleSubmit = async (signInData) => {
    try {
      const signIn = await axios.post(logInURL, signInData, config);
      const webToken = await signIn.data.jwt;
      localStorage.removeItem('userToken');
      localStorage.setItem('userToken', webToken);
      setLoggedIn(true);
      const decodedToken = jwt_decode(webToken);
      setUser(decodedToken);
    } catch(error) {
      setHasError(true);
    }
  }

  return (
    <div className="text-center m-5">
      <h1 className="sub-title">Log In</h1>
        {hasError ? (
          <Alert variant='danger'>Wrong email or password</Alert>
        ) : (
          <></>
        )}
        { loggedIn ? (
          <Redirect to="/request" />
        ) : (
          <></>
        )}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Schema}
        onSubmit={(values, actions) => {
          const dataToAPI = {
            "email": `${values.email}`,
            "password": `${values.password}`
          };

          handleSubmit(dataToAPI);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {( { errors, touched, handleSubmit, handleChange, handleBlur, values }) => (
          <Form className="mt-3" onSubmit={handleSubmit}>
            <div className="fields">
              <Field
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
                placeholder="Email address"
                as={TextField}
                style={{width: 300}}
            />
            {errors.email && touched.email ? (
              <div>{errors.email}</div>
            ) : null}
            </div>
            <div className="fields">
              <Field
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
                as={TextField}
                style={{width: 300}}
              />
              {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            </div>
            <div>
              <Button className="mt-3"type="submit">Log in</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )

};
