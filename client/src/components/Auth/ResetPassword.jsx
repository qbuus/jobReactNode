import { createContext, useState } from "react";
import OTPInput from "./OTPInput";
import Reset from "./Reset";
import ResetForm from "./ResetForm";
import Recovered from "./Recovered";

export const RecoveryContext = createContext();

const ResetPassword = () => {
  const [page, setPage] = useState("Send");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState(null);
  const [error, setError] = useState(null);

  return (
    <RecoveryContext.Provider
      value={{
        page,
        setPage,
        otp,
        setOTP,
        email,
        setEmail,
        setError,
        error,
      }}
    >
      <div className="h-screen w-screen flex items-center justify-center bg-base-300">
        <div className="flex flex-col w-full">
          <div className="max-w-xl w-full p-4 m-auto bg-base-100 rounded-md shadow-md">
            {page === "Send" && <ResetForm />}
            {page === "otp" && <OTPInput />}
            {page === "reset" && <Reset />}
            {page === "" && <Recovered />}
          </div>
        </div>
      </div>
    </RecoveryContext.Provider>
  );
};

export default ResetPassword;
