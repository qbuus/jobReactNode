import { Outlet, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRefreshMutation } from "../../Redux/Auth/authApiSlice";
import Loader from "../FeatureComponents/Loader";
import { useSelector } from "react-redux";

const RememberLogin = () => {
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [
    refresh,
    { isLoading, isSuccess, isUninitialized, isError },
  ] = useRefreshMutation();

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
  } else if (isError && loggedIn === "false" && !token) {
    content = (
      <p className="text-error-content">
        <Link to="/login">Please login again</Link>.
      </p>
    );
  } else if (isSuccess && trueSuccess && loggedIn === "true") {
    content = <Outlet />;
  } else if (token && isUninitialized && loggedIn === "true") {
    content = <Outlet />;
  }

  return content;
};

export default RememberLogin;
