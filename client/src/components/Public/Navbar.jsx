import { Link, useLocation } from "react-router-dom";
import { GiNetworkBars } from "react-icons/gi";
import ThemeChooser from "../Theme/ThemeChooser";
import { useRefreshMutation } from "../../Redux/Auth/authApiSlice";
import { useEffect, useState } from "react";
import UserOptions from "../Auth/UserOptions";

const HeaderNav = () => {
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isLoading, isSuccess }] =
    useRefreshMutation();

  useEffect(() => {
    let isDone = false;

    async function CheckLog() {
      try {
        await refresh();
        setTrueSuccess(true);
      } catch (error) {
        console.error(error);
      }
    }

    if (!isDone) {
      CheckLog();
    }

    return () => {
      isDone = true;
    };
  }, []);

  const location = useLocation();

  const loggedIn = window.localStorage.getItem("isLogged");

  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-60 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-xl">
      <nav className="sm:navbar w-full flex justify-between items-center">
        <div className="flex gap-3 md:gap-5 sm:navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-sm md:btn-md btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul className="dropdown-content bg-base-200 text-base-content rounded-box top-px max-h-96 w-56 overflow-y-auto shadow mt-16">
              <div
                className="grid grid-cols-1 gap-4 p-3"
                tabIndex={0}
              >
                <li className="md:hidden text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <Link>coślink1</Link>
                </li>
                <li className="md:hidden text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <Link>coślink2</Link>
                </li>
                <li className="md:hidden text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <Link>coślink3</Link>
                </li>
                <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                  <Link>coślink4</Link>
                </li>
              </div>
            </ul>
          </div>
          <div className="sm:hidden">
            <Link to="/">
              <button className="btn btn-sm md:btn-md btn-ghost md:inline">
                <div className="flex items-center gap-0 md:gap-3">
                  <GiNetworkBars className="h-6 w-6 md:h-8 md:w-8 items-center" />
                  <div className="text-lg md:text-2xl hidden md:inline">
                    <span className="lowercase">job</span>
                    <span className="uppercase">Portal</span>
                  </div>
                </div>
              </button>
            </Link>
          </div>
          <div className="hidden md:block">
            <Link className="btn btn-ghost drawer-button font-normal normal-case">
              11
            </Link>
          </div>
          <div className="hidden md:block">
            <Link className="btn btn-ghost drawer-button font-normal normal-case">
              22
            </Link>
          </div>
        </div>
        <div className="sm:navbar-center hidden sm:block">
          <Link to="/">
            <button className="btn btn-sm md:btn-md btn-ghost md:inline">
              <div className="flex items-center gap-0 md:gap-3">
                <GiNetworkBars className="h-6 w-6 md:h-8 md:w-8 items-center" />
                <div className="text-lg md:text-2xl hidden md:inline">
                  <span className="lowercase">job</span>
                  <span className="uppercase">Portal</span>
                </div>
              </div>
            </button>
          </Link>
        </div>
        <div className="sm:navbar-end">
          <div className="flex items-center gap-3 md:gap-5 justify-center">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-sm md:btn-md normal-case btn-ghost"
              >
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 stroke-current md:h-7 md:w-7"
                >
                  <path
                    strokeLinecap="round"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  ></path>
                </svg>
                <ul
                  data-choose-theme
                  className="p-2 dropdown-content bg-base-200 text-base-content rounded-box top-px max-h-96 w-52 md:w-72 overflow-y-auto shadow mt-16"
                >
                  <ThemeChooser />
                </ul>
              </div>
            </div>
            {loggedIn === "true" &&
            isSuccess &&
            trueSuccess ? null : (
              <div className="flex flex-col">
                <Link
                  to={
                    location.pathname === "/login"
                      ? "/register"
                      : "/login"
                  }
                >
                  <div
                    tabIndex={0}
                    className="btn btn-sm md:btn-md normal-case bg-secondary text-base-100 hover:text-success"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-bold">
                        {location.pathname === "/login"
                          ? "Sign up"
                          : "Sign in"}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            {trueSuccess && isSuccess && !isLoading ? (
              <UserOptions trueSuccess={trueSuccess} />
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderNav;
