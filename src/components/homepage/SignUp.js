import React, { useState, useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';
import axios from 'axios';
import { signup } from '../../utils/signup';
import { Redirect } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { File } from './File';
import { UserContext } from '../../UserContext';
import { setLocalStorage } from '../../utils/setLocalStorage';

// validations schemas
const Schema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('First name required'),
  lastName: Yup.string()
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Last name required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Password required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password required'),
});

const SignUp = () => {

  const { user, setUser } = useContext(UserContext);

  const [isCreated, setIsCreated] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [userID, setUserID] = useState('');
  const [token, setToken] = useState(
    localStorage.getItem('userToken') || null
  );
  const [userInformations, setUserInformations] = useState(
    localStorage.getItem('userInformations') || null
  );

  return (
  <div className="text-center">
    { isCreated ? (
      <File ID={userID} token={token} />
    ) : (
      <div>
        <h1 className="sub-title">Sign up</h1>

        { hasError ? (
          <Alert variant='danger'>An issue has occured, please try again.</Alert>
        ) : (
          <></>
        )}

        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', password: '', passwordConfirm: ''}}
          validationSchema={Schema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            setTimeout(() => {
              const dataToAPI = {
                email: values.email,
                password: values.password,
                password_confirmation: values.passwordConfirm,
                first_name: values.firstName,
                last_name: values.lastName,
              };
              const promise = signup(dataToAPI);
              promise.then(response => {
                setIsCreated(true);
                const responseData = response.data.user;
                const userInfos = {
                  userId: responseData.id,
                  email: responseData.email,
                  firstName: responseData.first_name,
                  lastName: responseData.last_name,
                };
                setUserInformations(userInfos)
                {/*REMOVE PREVIOUS STORAGE*/}
                {/*CHECK THAT ON THE BROWSER*/}
                setLocalStorage(userInfos);
                setUserID(response.data.user.id);
                setToken(response.data.jwt);
              })
              .catch(e => {
                setHasError(true);
              })
              actions.setSubmitting(false);
              actions.resetForm();
            }, 500);
          }}
        >
          {( { errors, touched, handleSubmit, handleChange, handleBlur, values, isSubmitting }) => (
            <Form className="mt-3" onSubmit={handleSubmit}>
              <div className="fields">
                <Field
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  name="firstName"
                  placeholder="First name"
                  as={TextField}
                  style={{width: 300}}
                />
                {errors.firstName && touched.firstName ? (
                <div className="error-field">{errors.firstName}</div>
              ) : null}
              </div>
              <div className="fields">
                <Field
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  name="lastName"
                  placeholder="Last name"
                  as={TextField}
                  style={{width: 300}}
                />
                {errors.lastName && touched.lastName ? (
                <div className="error-field">{errors.lastName}</div>
              ) : null}
              </div>
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
                <div className="error-field">{errors.email}</div>
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
                <div className="error-field">{errors.password}</div>
              ) : null}
              </div>
              <div className="fields">
                <Field
                    type="password"
                    name="passwordConfirm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirm}
                    placeholder="Confirm password"
                    as={TextField}
                    style={{width: 300}}
                />
                { errors.passwordConfirm && touched.passwordConfirm ? (
                  <div className="error-field">{errors.passwordConfirm}</div>
                ) : null}
              </div>
            <div>
              <Button disabled={isSubmitting} className="mt-3"type="submit">Submit</Button>
            </div>
          </Form>
        )}
      </Formik>
      </div>
    )}

    </div>
  )

};

export default SignUp;

