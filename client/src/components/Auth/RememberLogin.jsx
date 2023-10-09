import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRefreshMutation } from "../../Redux/Auth/authApiSlice";
import Loader from "../FeatureComponents/Loader";
import { useSelector } from "react-redux";

const RememberLogin = () => {
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isLoading, isSuccess }] =
    useRefreshMutation();

  const loggedIn = window.localStorage.getItem("isLogged");

  const token = useSelector((state) => state.userData.token);

  useEffect(() => {
    let isBeingDone = false;

    if (!isBeingDone) {
      const verifyLogged = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.error(error);
        }
      };

      if (!token) {
        verifyLogged();
      }
    }

    return () => (isBeingDone = true);
  }, [token]);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (!token && loggedIn === "false") {
    content = (
      <p className="text-center">
        <Link
          to="/login"
          className="text-center bg-base-200 p-3 rounded-md"
        >
          Please login again
        </Link>
      </p>
    );
  } else if (token && loggedIn === "true") {
    content = <Outlet />;
  } else if (trueSuccess && isSuccess && loggedIn === "true") {
    content = <Outlet />;
  }

  return content;
};

export default RememberLogin;
