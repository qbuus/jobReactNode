import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/Auth/authApiSlice.js";
import { useSelector, useDispatch } from "react-redux";
import {
  setErrorMessage,
  setMessage,
} from "../../Redux/states/messageSlice.js";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageSelector = useSelector(
    (state) => state.messageData.message
  );
  const errorMessageSelector = useSelector(
    (state) => state.messageData.errorMessage
  );

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [login, { isSuccess, isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch(setMessage(""));
        dispatch(setErrorMessage(""));
        navigate("/");
      }, 1000);
    }
  }, [isSuccess, navigate, dispatch]);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await login({
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const setUserPassword = (e) => setPassword(e.target.value);
  const setUserEmail = (e) => setEmail(e.target.value);

  return (
    <>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleLogin}
      >
        {errorMessageSelector !== null ? (
          <div className="text-error font-normal text-sm">
            {errorMessageSelector}
          </div>
        ) : null}
        {messageSelector !== null ? (
          <div className="text-neutral-content font-semibold text-lg">
            {messageSelector}
          </div>
        ) : null}
        <div>
          <label className="label">
            <span className="text-base label-text font-semibold">
              Email
            </span>
          </label>
          <input
            disabled={isLoading}
            autoComplete="on"
            required
            value={email}
            onChange={setUserEmail}
            type="email"
            placeholder="Email"
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
            disabled={isLoading}
            autoComplete="on"
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
            disabled={isLoading}
            type="submit"
            className="btn btn-primary w-full md:w-max"
          >
            Login
          </button>
        </div>
        <div className="text-sm font-semibold">
          <Link to="/reset-password">Forgot Password ?</Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
