import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const OffersLayout = () => {
  const auth = useAuth();

  let content;

  if (auth.role === "Recruiter") {
    content = <Outlet />;
  } else {
    <Navigate to="/login" state={{ from: location }} replace />;
  }

  return content;
};

export default OffersLayout;
