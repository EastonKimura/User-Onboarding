import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import axios from 'axios';
import * as Yup from 'yup';


const UserForm = ({ values, errors, touched, status }) => {
  console.log("values", values);
  console.log("errors", errors);
  console.log("touched", touched);
  const [users, setUsers] = useState([]);

  useEffect(() => {
status && setUsers(user => [...users, status]);
  }, [status])
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
          {}
          {}
          {}
          {touched.name && errors.name && (
        <p>{errors.name}</p>
        )}
        </label>
        <label htmlFor="email">
          <Field 
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
          />
          {touched.email && errors.email && (
        <p>{errors.email}</p>
        )}
        </label>
        <label htmlFor="password">
          <Field
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
          />
          {touched.password && errors.password && (
        <p>{errors.password}</p>
        )}
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
      {}
    {users.map(user => {
return (
    <div key="user.id">
    <p>Name: {user.name}</p>
    <p>Email: {user.email}</p>
  </div>
);
})}
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
    name: Yup.string().required("Please enter a name"),
    email: Yup.string().required("Don't forget an email"),
    password: Yup.string().required("Password is required")
  }), 
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log("this is the response: ", res);
        setStatus(res.data);
        resetForm();
      })

      .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm; 