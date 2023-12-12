import { Outlet } from "react-router-dom";
import { useRefreshMutation } from "../Redux/Auth/authApiSlice";
import { useEffect, useState } from "react";
import Loader from "./FeatureComponents/Loader";

const Layout = () => {
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    setTrueSuccess(false);
    refresh();
    setTrueSuccess(true);
  }, []);

  return (
    <>
      {trueSuccess && <Outlet />}
      {!trueSuccess && <Loader />}
    </>
  );
};

export default Layout;
