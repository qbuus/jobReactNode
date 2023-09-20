import React, { useEffect } from "react";
import Roles from "../FeatureComponents/Roles";
import axios from "axios";
import Loader from "../FeatureComponents/Loader";
import { useNavigate } from "react-router-dom";

const RegiserForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [status, setStatus] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    role: "Seeker",
  });
  const { firstName, lastName, password, email, role } =
    formData;

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
      setStatus(response.status);
      setFormData({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        role: "Seeker",
      });
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status === 201) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [status, navigate]);

  return (
    <>
      {message.length > 0 ? (
        <p className="text-success font-semibold text-lg">
          {message}
        </p>
      ) : null}
      {errorMessage.length > 0 ? (
        <p className="text-error font-normal text-sm">
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
            autoComplete="on"
            disabled={loading}
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
            autoComplete="on"
            disabled={loading}
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
              Password
            </span>
          </label>
          <input
            autoComplete="on"
            disabled={loading}
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
            autoComplete="on"
            disabled={loading}
            onChange={handleInputChange}
            value={email}
            name="email"
            type="email"
            placeholder="@"
            className="input input-bordered input-primary md:min-w-max w-full"
          />
        </div>
        <div>
          <Roles
            change={handleInputChange}
            value={role}
            disabled={loading}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            autoComplete="on"
            required
            type="checkbox"
            disabled={loading}
          />
          <label>Accept terms of service</label>
        </div>
        <div>
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary md:min-w-max w-full relative"
          >
            {loading ? <Loader /> : "Register"}
          </button>
        </div>
      </form>
    </>
  );
};

export default RegiserForm;
