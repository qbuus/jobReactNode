import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Redux/Auth/authSlice";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { useLoginMutation } from "../../Redux/Auth/authApiSlice.js";

const LoginForm = () => {
  useDocumentTitle("Login");
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [login] = useLoginMutation();

  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const { accessToken } = await login({
        username,
        password,
      }).unwrap();
      dispatch(setUserData(accessToken));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
