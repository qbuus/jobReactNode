import axios from "axios";
import { useContext } from "react";
import { RecoveryContext } from "./ResetPassword";

const ResetForm = () => {
  const { email, setEmail, error, setError, setOTP, setPage } =
    useContext(RecoveryContext);

  async function navigateToOtp(e) {
    e.preventDefault();

    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);

      setOTP(OTP);

      await axios
        .post(
          `${import.meta.env.VITE_URI}/users/forget-password`,
          {
            OTP,
            receiver: email,
          }
        )
        .then(() => {
          setPage("otp");
        })
        .catch((error) =>
          setError(error.response.data.message)
        );
      return;
    }
    return alert("Please enter your email");
  }

  const setUserEmail = (e) => setEmail(e.target.value);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={navigateToOtp}
    >
      {error !== null ? (
        <div className="text-error font-normal text-sm">
          {error}
        </div>
      ) : null}
      <div>
        <label className="label">
          <span className="text-base label-text font-semibold">
            Email
          </span>
        </label>
        <input
          autoComplete="on"
          required
          onChange={setUserEmail}
          value={email}
          type="email"
          placeholder="@"
          className="input input-bordered input-primary w-full"
        />
      </div>
      <div>
        <button className="btn btn-primary w-full">
          Send email
        </button>
      </div>
    </form>
  );
};

export default ResetForm;
