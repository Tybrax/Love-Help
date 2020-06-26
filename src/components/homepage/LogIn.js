import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
});

const SignUp = () => (
  <div className="text-center">
    <h1 className="sub-title">Log In</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
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
);

export default SignUp;
