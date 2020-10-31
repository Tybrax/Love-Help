import React, { useState, useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';
import { login } from '../../utils/login';
import { UserContext } from '../../UserContext';
import jwt_decode from 'jwt-decode';
import { Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

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

export const LogIn = () => {

  /*CREATE CONTEXT FOR USER DATA*/
  const { user, setUser } = useContext(UserContext);

  const [hasError, setHasError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem('userToken') || null
  )

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
          setTimeout(() => {
            const dataToAPIOne = {
                "email": `${values.email}`,
                "password": `${values.password}`
            }
            const promise = login(dataToAPIOne);
            promise.then(response => {

              {/*Retrieve JWT from request's response*/}
              const webToken = response.data.jwt;

              {/*Store the JWT within the local storage*/}
              localStorage.removeItem('userToken');
              localStorage.setItem('userToken', webToken);

              {/*Change the state of loggedIn to true*/}
              if (!loggedIn) {
                setLoggedIn(true);
              }

              {/*Decode the token to retrieve user's information and update the user state*/}
              const decodedToken = jwt_decode(webToken);
              setUser(decodedToken);

              setTimeout(() => {
                setLoggedIn(false);
              }, 1500)
            })
            .catch(e => {
              if (!hasError) {
                setHasError(true);
              }
              setTimeout(() => {
                setHasError(false);
              }, 2000)
            })
            actions.setSubmitting(false);
            actions.resetForm();
          }, 500);
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
