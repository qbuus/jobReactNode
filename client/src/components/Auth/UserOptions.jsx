import { CiUser } from "react-icons/ci";
import SignOut from "../Auth/SingOut";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useRefreshMutation } from "../../Redux/Auth/authApiSlice";
import { useEffect } from "react";

const UserOptions = () => {
  const [refresh, { isSuccess, status }] = useRefreshMutation();

  useEffect(() => {
    async function loadUserBeforehand() {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      }
    }
    loadUserBeforehand();
  }, []);

  const auth = useAuth();
  console.log(auth);

  return (
    <>
      {isSuccess &&
      status === "fulfilled" &&
      auth?.userID.length > 0 &&
      auth?.role.length > 0 &&
      auth?.email.length > 0 ? (
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
              {auth.email ? (
                <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <Link to="/my-profile">Profile</Link>
                </li>
              ) : null}
              {auth.email.length > 3 ? (
                <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <Link>
                    Settings
                    <span className="badge ml-3 bg-base-100">
                      New
                    </span>
                  </Link>
                </li>
              ) : null}
              {auth.email.length > 3 ? (
                <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <SignOut />
                </li>
              ) : null}
              {auth.email.length > 0 ? (
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
