import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import axios from 'axios';
import * as Yup from 'yup';


const UserForm = ({ values, errors, touched, status }) => {
  console.log("values", values);
  console.log("errors", errors);
  console.log("touched", touched);
  return (
    <div>
      <Form>
        <label htmlFor="name">
          <Field 
            id="name"
            type="text"
            name="name"
            placeholder="Enter name"
          />
        </label>
        <label htmlFor="email">
          <Field 
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
          />
        </label>
        <label htmlFor="password">
          <Field
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
          />
        </label>
        <label>
          Terms of Condition
          <Field
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
        </label>
        <button type="submit">Submit!</button>
      </Form>
    </div>
  );
};

const FormikUserForm = withFormik({
  
  mapPropsToValues(props) {
    
    return {
      
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      terms: props.terms || false
    };
    
  },
 
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required")
  }), 
})(UserForm);

export default FormikUserForm; 