import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useRefreshMutation } from "../../Redux/Auth/authApiSlice";
import Loader from "../FeatureComponents/Loader";

const RememberLogin = () => {
  const [refresh, { isLoading, isSuccess }] =
    useRefreshMutation();

  useEffect(() => {
    let isBeingDone = false;

    if (!isBeingDone) {
      const verifyLogged = async () => {
        try {
          await refresh();
        } catch (error) {
          console.error(error);
        }
      };

      verifyLogged();
    }

    return () => (isBeingDone = true);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && <Outlet />}
    </>
  );
};

export default RememberLogin;
