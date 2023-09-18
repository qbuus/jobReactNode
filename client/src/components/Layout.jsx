import React from "react";
import { Outlet } from "react-router-dom";
import { useRefreshMutation } from "../Redux/Auth/authApiSlice";
import Loader from "./FeatureComponents/Loader";

const Layout = () => {
  const [refresh, { isSuccess, isLoading }] =
    useRefreshMutation();

  React.useEffect(() => {
    async function loadUserBeforehand() {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      }
    }
    loadUserBeforehand();
  }, []);

  return (
    <>
      {isLoading ? <Loader /> : null}
      {isSuccess ? <Outlet /> : null}
    </>
  );
};

export default Layout;
