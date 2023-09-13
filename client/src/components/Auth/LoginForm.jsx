import React from "react";

const LoginForm = () => {
  return (
    <>
      <form className="flex flex-col gap-3">
        <div>
          <label className="label">
            <span className="text-base label-text font-semibold">
              Email
            </span>
          </label>
          <input
            type="email"
            placeholder="Email Address"
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
