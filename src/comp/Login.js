import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "./Api/Main";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
function Login() {
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
      email: "",
      password: "",
    },
    // validationSchema: basicschema,

    onSubmit: async (submittedValues) => {
      const inputs = {
        email: submittedValues.email,
        password: submittedValues.password,
      };
      LoginUser(
        "https://api-nodejs-todolist.herokuapp.com/user/login",
        inputs,
        navigate
      );
    },
  });
  return (
    <Container>
      <Form className={"form"} onSubmit={handleSubmit}>
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
        <Form.Group className={"submit"}>
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
        <div className={"button"}>
          <Button style={{ marginRight: "10px" }} type="submit">
            Login
          </Button>
          {"     "}
          <Link to="/Newuser">
            {" "}
            <Button type="submit">Sing in</Button>
          </Link>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
