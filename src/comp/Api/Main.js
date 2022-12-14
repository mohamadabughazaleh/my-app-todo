import axios from "axios";
import { notify, error } from "../notify/Notfiy";
const config = {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
};
export function UserRegister(url, param, navigate) {
  axios
    .post(url, {
      name: param.name,
      email: param.email,
      password: param.password,
      age: param.age,
    })
    .then((e) => {
      notify("done register");
      setTimeout(() => {
        if (e.status == 201) {
          navigate("/");
        }
      }, 2000);
    })
    .catch(() => error("error register"));
}
export function LoginUser(url, param, navigate) {
  axios
    .post(url, {
      email: param.email,
      password: param.password,
    })
    .then((e) => {
      console.log(e);
      sessionStorage.setItem("token", e.data.token);
      sessionStorage.setItem("id", e.data.user._id);
    })
    .then(() => {
      notify("info true");
      setTimeout(() => {
        window.location.replace("/Todos");
      }, 2000);
    })
    .catch(() => error("info not true"));
}
export async function GetTodos(param) {
  let data = await axios.get(
    "https://api-nodejs-todolist.herokuapp.com/task",
    config
  );

  return data;
}
export async function CreateTodos(url, param, navigate) {
  let g = await axios
    .post(
      url,
      {
        description: param.description,
        completed: param.completed,
      },
      config
    )
    .then((e) => {
      notify("done create");
      setTimeout(() => {
        if (e.status == 201) {
          navigate("/");
        }
      }, 2000);
    })
    .catch(() => error("error create"));
  return g;
}
export async function EditTodos(url, param, navigate) {
  let g = await axios
    .put(
      url,
      {
        description: param.description,
        completed: param.completed,
      },
      config
    )
    .then((e) => {
      notify("done edit");
      setTimeout(() => {
        navigate("/Todos");
      }, 3000);
    })
    .catch(() => error("error edit"));
  return g;
}
export async function deleteTodos(param, navigate) {
  let g = await axios.delete(
    `https://api-nodejs-todolist.herokuapp.com/task/${param}`,

    config
  );

  return g;
}

export async function logout() {
  let log = await axios.post(
    `https://api-nodejs-todolist.herokuapp.com/user/logout`,
    config
  );
  return log;
}

export async function uplode(formdata) {
  let Imagee = await axios.post(
    `https://api-nodejs-todolist.herokuapp.com/user/me/avatar`,
    formdata,
    config
  );
  return Imagee;
}
export async function getuplode() {
  let Imagee = await axios.get(
    `https://api-nodejs-todolist.herokuapp.com/user/${sessionStorage.getItem(
      "id"
    )}/avatar`
  );
  return Imagee;
}
