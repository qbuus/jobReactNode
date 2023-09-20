import { Outlet } from "react-router-dom";
import { useRefreshMutation } from "../Redux/Auth/authApiSlice";

const Layout = () => {
  const [, { isLoading }] = useRefreshMutation();

  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 z-100 flex justify-center">
          <span className="loading loading-spinner text-neutral-content loading-lg"></span>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Layout;
