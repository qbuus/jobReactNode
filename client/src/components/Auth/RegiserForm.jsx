import React from "react";
import Roles from "../FeatureComponents/Roles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegiserForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    role: "Seeker",
  });
  const {
    firstName,
    lastName,
    username,
    password,
    email,
    role,
  } = formData;

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleRegister(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3500/users/create",
        formData
      );
      setMessage(response.data.message);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function BackdropLoader() {
    return (
      <div className="fixed bg-black bg-opacity-50 z-100 h-full w-full flex items-center justify-center">
        <span className="loading loading-spinner text-neutral"></span>
      </div>
    );
  }

  return (
    <>
      {loading ? <BackdropLoader /> : null}
      {message.length > 0 ? (
        <p className="text-success font-semibold">{message}</p>
      ) : null}
      {errorMessage.length > 0 ? (
        <p className="text-error font-semibold">
          {errorMessage}
        </p>
      ) : null}
      <form
        className="flex flex-col gap-3 overflow-y-auto"
        onSubmit={handleRegister}
      >
        <div>
          <label className="label">
            <span className="text-base label-text font-semibold">
              First Name
            </span>
          </label>
          <input
            value={firstName}
            onChange={handleInputChange}
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-bordered input-primary md:min-w-max w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text font-semibold">
              Last Name
            </span>
          </label>
          <input
            onChange={handleInputChange}
            value={lastName}
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-bordered input-primary md:min-w-max w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text font-semibold">
              Username
            </span>
          </label>
          <input
            onChange={handleInputChange}
            value={username}
            name="username"
            type="text"
            placeholder="Username"
            className="input input-bordered input-primary md:min-w-max w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text font-semibold">
              Password
            </span>
          </label>
          <input
            onChange={handleInputChange}
            value={password}
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered input-primary md:min-w-max w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text font-semibold">
              Email
            </span>
          </label>
          <input
            onChange={handleInputChange}
            value={email}
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered input-primary md:min-w-max w-full"
          />
        </div>
        <div>
          <Roles change={handleInputChange} value={role} />
        </div>
        <div className="flex items-center gap-2">
          <input required type="checkbox" />
          <label>Accept terms of service</label>
        </div>
        <div>
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary md:min-w-max w-full"
          >
            Register Now
          </button>
        </div>
      </form>
    </>
  );
};

export default RegiserForm;
