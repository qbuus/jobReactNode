import { useState, useContext, useEffect } from "react";
import { RecoveryContext } from "./ResetPassword";

const OTPInput = () => {
  const { otp, setPage, email } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  function verifyOTP(e) {
    e.preventDefault();

    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset");
      console.log("code correct");
    } else {
      alert(
        "The code you have entered is not correct, try again or re-send the link"
      );
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prev) => {
        prev <= 1 && clearInterval(interval);
        if (prev <= 1) setDisable(false);
        if (prev <= 0) return prev;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="flex justify-center items-center">
      <div className="px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium">
              <p>
                We have sent a code to your email:
                <span className="font-semibold ml-1 text-primary-focus">
                  {email}
                </span>
              </p>
            </div>
            <p className="font-semibold text-primary-focus">
              Please check your spam folder
            </p>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border text-lg"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          e.target.value,
                          OTPinput[1],
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border "
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          e.target.value,
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          e.target.value,
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border "
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          OTPinput[2],
                          e.target.value,
                        ])
                      }
                    ></input>
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      onClick={verifyOTP}
                      className="btn btn-primary flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 text-md shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-col gap-1 sm:flex-row items-center justify-center text-center text-sm font-medium space-x-1">
                    <p>
                      Send again in:{" "}
                      <span className="font-semibold">
                        {timerCount}
                      </span>
                      s
                    </p>
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={disable}
                      onClick={() => setPage("Send")}
                    >
                      Send again
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
