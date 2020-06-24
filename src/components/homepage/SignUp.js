import React from 'react';
import { Card } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const Schema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  file: Yup.mixed()
    .required('Your ID is required')
});

const SignUp = () => (
  <div className="text-center">
    <h1 className="text-center">Sign up</h1>
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '', passwordConfirm: '', file: '' }}
      validationSchema={Schema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          actions.resetForm();
        }, 1000);
      }}
    >
      {( { errors, touched, handleSubmit, handleChange, handleBlur, values }) => (
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
            <div>{errors.firstName}</div>
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
            <div>{errors.lastName}</div>
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
            <div>{errors.passwordConfirm}</div>
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
            <div>{errors.file}</div>
          ) : null}
          </div>
          <div>
            <Button className="mt-3"type="submit">Submit</Button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default SignUp;

