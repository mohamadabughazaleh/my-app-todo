import React, { useState } from "react";
import { useFormik } from "formik";
import { CreateTodos, uplode } from "./Api/Main";
import Switch from "@mui/material/Switch";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
function Create() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");

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
      description: "",
      completed: false,
    },
    // validationSchema: basicschema,

    onSubmit: async (submittedValues) => {
      console.log(submittedValues);
      const inputs = {
        description: submittedValues.description,
        completed: submittedValues.completed,
      };
      CreateTodos(
        "https://api-nodejs-todolist.herokuapp.com/task/",
        inputs,
        navigate
      );
    },
  });
  return (
    <Container>
      <Form className={"form"} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> description </Form.Label>
          <Form.Control
            required
            type="text"
            name="description"
            value={values.description}
            onBlur={handleBlur}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label> completed </Form.Label>
          <Switch
            name="completed"
            onChange={handleChange}
            value={values.completed}
          />
        </Form.Group>
        <Form.Label> Image </Form.Label>
        <Form.Control type="file" name="file"></Form.Control>
        <Button type="submit">submit</Button>
      </Form>
    </Container>
  );
}

export default Create;
