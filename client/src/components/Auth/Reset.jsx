import { useContext, useState } from "react";
import { RecoveryContext } from "./ResetPassword";
import axios from "axios";

export default function Reset() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { setPage, email, setEmail, setOTP } =
    useContext(RecoveryContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  async function SetNewPassword(e) {
    e.preventDefault();

    await axios
      .patch(
        `${import.meta.env.VITE_URI}/users/set-new-password`,
        {
          email: email,
          newPassword: newPassword,
          confirmNewPassword: confirmPassword,
        }
      )
      .then((response) => {
        setMessage(response.data.message);
        setSuccess(response.status);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  if (success === 200) {
    setPage("");
    setMessage(null);
    setError(null);
    setEmail("");
    setOTP(null);
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={SetNewPassword}
    >
      {email && (
        <p>
          Changing password for:{" "}
          <span className="text-primary font-semibold">
            {email}
          </span>
        </p>
      )}
      {error !== null ? (
        <div className="text-error font-normal text-sm">
          {error}
        </div>
      ) : null}
      {message !== null ? (
        <div className="text-success font-normal text-sm">
          {message}
        </div>
      ) : null}
      <div>
        <label className="label">
          <span className="text-base label-text font-semibold">
            Password
          </span>
        </label>
        <input
          autoComplete="off"
          required
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          type="password"
          placeholder="new password"
          className="input input-bordered input-primary w-full"
        />
      </div>
      <div>
        <label className="label">
          <span className="text-base label-text font-semibold">
            Password
          </span>
        </label>
        <input
          autoComplete="off"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          placeholder="confirm password"
          className="input input-bordered input-primary w-full"
        />
      </div>
      <div className="">
        <button className="btn btn-primary w-full">
          Change Password
        </button>
      </div>
    </form>
  );
}
