import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/Auth/authApiSlice.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate();
  const messageSelector = useSelector(
    (state) => state.messageData.message
  );
  const errorMessageSelector = useSelector(
    (state) => state.messageData.errorMessage
  );

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [login, { isSuccess }] = useLoginMutation();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await login({
        username,
        password,
      });
      isSuccess && navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  const setUserPassword = (e) => setPassword(e.target.value);
  const setUserUsername = (e) => setUsername(e.target.value);

  const notify = () => {
    toast(`User signed in`, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  return (
    <>
      {isSuccess ? notify() : null}
      <form
        className="flex flex-col gap-3"
        onSubmit={handleLogin}
      >
        {errorMessageSelector ? (
          <div className="text-error font-semibold">
            {errorMessageSelector}
          </div>
        ) : null}
        {messageSelector ? (
          <div className="text-neutral-content font-semibold">
            {messageSelector}
          </div>
        ) : null}
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
