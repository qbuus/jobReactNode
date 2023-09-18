import { Outlet } from "react-router-dom";
import ThemeChooser from "../Theme/ThemeChooser";
import { Link, useLocation } from "react-router-dom";

const SignLayout = () => {
  const location = useLocation();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0">
          <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-60 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-xl">
            <nav className="navbar w-full">
              <div className="navbar-start flex gap-3 md:gap-5 items-center">
                <div className="font-semibold text-primary text-lg md:text-2xl items-center">
                  <Link to="/">jobPortal</Link>
                </div>
                <div className="hidden md:block text-neutral items-center text-sm">
                  Find your dream job withing a couple of
                  minutes
                </div>
                <div className="dropdown dropdown-content">
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
                    <ul className="dropdown-content bg-base-200 text-base-content rounded-box top-px max-h-96 w-56 md:w-72 overflow-y-auto shadow mt-16">
                      <div className="grid grid-cols-1 gap-4 p-5">
                        <ThemeChooser />
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="navbar-end">
                <div>
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
              </div>
            </nav>
          </div>
        </header>
        <main className="grow flex bg-base-300 z-0">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SignLayout;
