import React, { useState, useCallback, useEffect, memo, useRef } from "react";
import { GetTodos, deleteTodos, logout, getuplode } from "./Api/Main";
// import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form, Container } from "react-bootstrap";
function Todos() {
  const navigate = useNavigate();
  const [date, setdate] = useState([]);
  const [Image, setImage] = useState("");
  const tr = useRef();
  async function addTodo() {
    const n = await GetTodos();
    const g = await [...new Set(n.data.data)];
    setdate(g);
  }
  useEffect(() => {
    addTodo();
    getimge();
  }, []);
  function ID(paras, j, b) {
    const user = {
      id: paras,
      ds: j,
      c: b,
    };
    window.sessionStorage.setItem("user", JSON.stringify(user));
    navigate("/EditTodos");
  }
  function Delete(param) {
    deleteTodos(param, navigate).then((e) => {
      if (e.status === 200) {
        addTodo();
      }
    });
  }
  function logg() {
    logout().then((e) => {
      if (e.status == 200) {
        sessionStorage.clear();
      }
    });
  }
  function Search(param) {
    if (param) {
      let Filter = date.filter((e) => e.description === param.toString());
      setdate(Filter);
      console.log(date);
    } else {
      addTodo();
    }
  }
  async function getimge() {
    let img = await getuplode().then((e) => {
      setImage(e.data);
      console.log(Image);
    });

    return img;
  }
  return (
    <>
      {date.length > 0 && (
        <>
          <Container>
            <Form.Group>
              <Form.Label> search </Form.Label>
              <Form.Control
                ref={tr}
                onChange={(e) => Search(e.target.value)}
                required
                type="search"
                name="search"
              ></Form.Control>
            </Form.Group>
            <Button
              onClick={() => navigate("/Uplode")}
              className={"button2"}
              variant="success"
            >
              {" "}
              uplode
            </Button>

            <Button
              onClick={() => logg()}
              className={"button2"}
              variant="success"
            >
              {" "}
              Logout
            </Button>
            <Button
              className={"button2"}
              onClick={() => navigate("/Create")}
              variant="success"
            >
              create
            </Button>
          </Container>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>descriptors</th>
                <th>Created at</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {date.map((items, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index}</td>
                  <td>{items.description}</td>
                  <td>{items.createdAt}</td>
                  <td>{items.completed ? "true" : "false"}</td>
                  <td>
                    <Button onClick={() => Delete(items._id)} variant="danger">
                      Delete
                    </Button>
                    {"                                       "}
                    <Button
                      onClick={() =>
                        ID(items._id, items.description, items.completed)
                      }
                      variant="success"
                    >
                      Modfiy
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </>
      )}
    </>
  );
}

export default memo(Todos);
