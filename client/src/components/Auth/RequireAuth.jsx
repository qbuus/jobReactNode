import useAuth from "../../hooks/useAuth";
import {
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
  console.log(useAuth());

  const auth = useAuth();
  const location = useLocation();

  const toReturn =
    auth?.userID.length > 0 &&
    auth?.role.length > 0 &&
    auth?.email.length > 0 &&
    allowedRole.includes(auth.role) ? (
      <Outlet />
    ) : (
      <Navigate
        to={"/login"}
        state={{ from: location }}
        replace
      />
    );

  return toReturn;
};

export default RequireAuth;
