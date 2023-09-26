import { Navigate, Outlet } from "react-router-dom";

const AuthRequired = () => {
  const loggedIn = window.localStorage.getItem("isLogged");

  return (
    <>
      {loggedIn === "true" && <Outlet />}
      {loggedIn === "false" && <Navigate to={"/login"} />}
    </>
  );
};

export default AuthRequired;
