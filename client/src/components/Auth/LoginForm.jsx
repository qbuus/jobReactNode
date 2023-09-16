import React from "react";
import useAuth from "../../hooks/useAuth.js";
import { useDispatch, useSelector } from "react-redux";
import {
  currentToken,
  setUserData,
} from "../../Redux/Auth/authSlice";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import axios from "axios";

const LoginForm = () => {
  useDocumentTitle("Login");

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3500/users/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setUserData(response.data));
      })
      .catch((err) => console.log(err.response.data));
  }

  const setUserPassword = (e) => setPassword(e.target.value);
  const setUserUsername = (e) => setUsername(e.target.value);

  return (
    <>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleLogin}
      >
        <div>
          <label className="label">
            <span className="text-base label-text font-semibold">
              Username
            </span>
          </label>
          <input
            required
            value={username}
            onChange={setUserUsername}
            type="text"
            placeholder="Username"
            className="input input-bordered input-primary md:w-max w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text font-semibold">
              Password
            </span>
          </label>
          <input
            required
            value={password}
            onChange={setUserPassword}
            type="password"
            placeholder="Password"
            className="input input-bordered input-primary md:w-max w-full"
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary md:w-max w-full"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
