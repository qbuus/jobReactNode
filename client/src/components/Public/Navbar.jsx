import React from "react";
import { Link } from "react-router-dom";
import { GiNetworkBars } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import ThemeChooser from "../Theme/ThemeChooser";

const HeaderNav = () => {
  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-xl">
      <nav className="navbar w-full">
        <div className="flex gap-3 md:gap-5 navbar-start">
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
          <div className="hidden md:block ">
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
        <div className="navbar-center">
          <Link to="/">
            <button className="btn btn-sm md:btn-md btn-ghost md:inline">
              <div className="flex items-center gap-0 md:gap-3">
                <GiNetworkBars className="h-8 w-6 md:h-8 md:w-8" />
                <div className="text-lg md:text-2xl hidden md:inline">
                  <span className="lowercase">job</span>
                  <span className="uppercase">Portal</span>
                </div>
              </div>
            </button>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-2 md:gap-5 justify-center">
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
                  className="h-5 w-5 stroke-current md:hidden"
                >
                  <path
                    strokeLinecap="round"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  ></path>
                </svg>
                <span className="hidden font-normal md:inline">
                  Theme
                </span>
                <ul className="dropdown-content bg-base-200 text-base-content rounded-box top-px max-h-96 w-40 sm:w-56 overflow-y-auto shadow mt-16">
                  <div className="grid grid-cols-1 gap-4 p-5">
                    <ThemeChooser />
                  </div>
                </ul>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <Link to="/login">
                <div
                  tabIndex={0}
                  className="btn btn-sm md:btn-md normal-case bg-secondary text-base-100 hover:text-success"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-bold">Sign in</span>
                  </div>
                </div>
              </Link>
            </div>
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
                  <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                    <Link>Profile</Link>
                  </li>
                  <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                    <Link>
                      Settings
                      <span className="badge ml-3 bg-base-100">
                        New
                      </span>
                    </Link>
                  </li>
                  <li className="text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2">
                    <Link>Sign out</Link>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderNav;
