/* eslint-disable react/prop-types */
import { CiUser } from "react-icons/ci";
import SignOut from "../Auth/SingOut";
import { Link } from "react-router-dom";
import { useRefreshMutation } from "../../Redux/Auth/authApiSlice";

const UserOptions = ({ trueSuccess }) => {
  const [, { isLoading }] = useRefreshMutation();

  const loggedIn = window.localStorage.getItem("isLogged");

  return (
    <>
      {loggedIn === "true" &&
      Boolean(trueSuccess) &&
      !isLoading ? (
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
              {loggedIn === "true" ? (
                <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <Link to="/my-profile">Profile</Link>
                </li>
              ) : null}
              {loggedIn === "true" ? (
                <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <Link>
                    Settings
                    <span className="badge ml-3 bg-base-100">
                      New
                    </span>
                  </Link>
                </li>
              ) : null}
              {loggedIn === "true" ? (
                <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <SignOut />
                </li>
              ) : null}
              {loggedIn === "true" ? (
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
