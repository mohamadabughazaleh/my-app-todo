import React from "react";
import Newuser from "./comp/Api/Newuser";
import Login from "./comp/Login";
import Todos from "./comp/Todos";
import Create from "./comp/Create";
import EditTodos from "./comp/Edit";
import Notfound from "./comp/Notfound";
import Uplode from "./comp/Uplode";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../src/App.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              sessionStorage.getItem("token") == null ? <Login /> : <Todos />
            }
          />
          <Route path="/Newuser" element={<Newuser />} />
          <Route
            path="/Todos"
            element={
              sessionStorage.getItem("token") == null ? <Login /> : <Todos />
            }
          />
          <Route path="/Create" element={<Create />} />
          <Route path="/EditTodos" element={<EditTodos />} />
          <Route path="/Uplode" element={<Uplode />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
