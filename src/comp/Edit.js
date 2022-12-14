import React, { useEffect } from "react";
import { useFormik } from "formik";
import { EditTodos } from "./Api/Main";
import Switch from "@mui/material/Switch";

import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
function Edit() {
  var obj = JSON.parse(sessionStorage.getItem("user"));

  const navigate = useNavigate();
  const { values, handleBlur, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        description: "",
        completed: obj.c,
      },
      // validationSchema: basicschema,

      onSubmit: (submittedValues) => {
        const inputs = {
          description: submittedValues.description,
          completed: submittedValues.completed,
        };
        EditTodos(
          `https://api-nodejs-todolist.herokuapp.com/task/${obj.id}`,
          inputs,
          navigate
        );
      },
    });

  useEffect(() => {
    setFieldValue("description", obj.ds);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            defaultChecked={values.completed}
          />
        </Form.Group>
        <Button type="submit">submit</Button>
      </Form>
    </Container>
  );
}

export default Edit;
