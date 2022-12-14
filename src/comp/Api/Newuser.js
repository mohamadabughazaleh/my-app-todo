import React from "react";
import { useFormik } from "formik";
import { UserRegister } from "./Main";

import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
function Newuser() {
  const navigate = useNavigate();
  const {
    values,
    handleBlur,
    isSubmitting,
    touched,
    errors,
    resetForm,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: 0,
      password: "",
    },
    // validationSchema: basicschema,

    onSubmit: async (submittedValues) => {
      const inputs = {
        name: submittedValues.name,
        email: submittedValues.email,
        password: submittedValues.password,
        age: submittedValues.age,
      };
      UserRegister(
        "https://api-nodejs-todolist.herokuapp.com/user/register",
        inputs,
        navigate
      );
    },
  });
  return (
    <Container>
      <Form className={"form"} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> Name </Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label> email </Form.Label>
          <Form.Control
            required
            type="text"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label> password </Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label> age </Form.Label>
          <Form.Control
            required
            type="number"
            name="age"
            value={values.age}
            onBlur={handleBlur}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">submit</Button>
      </Form>
    </Container>
  );
}

export default Newuser;
