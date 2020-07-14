import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';
import axios from 'axios';

// validations using YUP
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
  file: Yup.mixed()
    .required('Your ID is required')
});

const SignUp = () => (
  <div className="text-center">
    <h1 className="sub-title">Sign up</h1>
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '', passwordConfirm: '', file: '' }}
      validationSchema={Schema}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          /*Send data to a custom test API*/
          /*axios.post('http://localhost:3001/api/v1/users', values);*/
          actions.setSubmitting(false);
          actions.resetForm();
        }, 1000);
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
            {errors.passwordConfirm && touched.passwordConfirm ? (
            <div className="error-field">{errors.passwordConfirm}</div>
          ) : null}
          </div>
          <div>
            <h5>Upload a copy of your ID</h5>
            <Field
              type="file"
              name="file"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.file}
              as={TextField}
              style={{width: 300}}
              accept=".png, .jpg, .pdf"
            />
            {errors.file && touched.file ? (
            <div className="error-field">{errors.file}</div>
          ) : null}
          </div>
          <div>
            <Button disabled={isSubmitting} className="mt-3"type="submit">Submit</Button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default SignUp;

