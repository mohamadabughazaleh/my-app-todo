import React, { useState } from "react";
import { uplode } from "./Api/Main";
import Switch from "@mui/material/Switch";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
function Uplode() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  function Imageuplode(e) {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }
  const Alpi = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("avatar", image);
    console.log(image);

    uplode(formdata).then((res) => console.log(res));
  };

  return (
    <Container>
      <Form className={"form"} onSubmit={Alpi}>
        <Form.Label> Image </Form.Label>
        <Form.Control
          onChange={Imageuplode}
          type="file"
          name="avatar"
        ></Form.Control>
        <input type="submit" />
      </Form>
    </Container>
  );
}

export default Uplode;
