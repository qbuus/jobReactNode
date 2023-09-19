import React from "react";
import { CiUser } from "react-icons/ci";
import SignOut from "../Auth/SingOut";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useRefreshMutation } from "../../Redux/Auth/authApiSlice";

const UserOptions = () => {
  const auth = useAuth();

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
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div>
            <span className="loading loading-spinner text-neutral-content loading-sm"></span>
          </div>
        </div>
      ) : null}
      {auth?.userID.length > 0 &&
      auth?.role.length > 0 &&
      auth?.username.length > 3 ? (
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-sm md:btn-md btn-ghost btn-cirlce flex items-center justify-center"
          >
            <div className="rounded-full">
              <CiUser className="h-6 w-6" />
            </div>
          </label>
          <ul
            className="dropdown-content bg-base-200 text-base-content rounded-box top-px max-h-96 w-56 overflow-y-auto shadow mt-16"
            tabIndex={0}
          >
            <div className="grid grid-cols-1 gap-4 p-3">
              {auth.username ? (
                <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <Link>Profile</Link>
                </li>
              ) : null}
              {auth.username.length > 3 ? (
                <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <Link>
                    Settings
                    <span className="badge ml-3 bg-base-100">
                      New
                    </span>
                  </Link>
                </li>
              ) : null}
              {auth.username.length > 3 ? (
                <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <SignOut />
                </li>
              ) : null}
              {auth.username.length > 3 ? (
                <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <Link to="/register">Sign up</Link>
                </li>
              ) : null}
            </div>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default UserOptions;
