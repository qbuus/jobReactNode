import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const SignLayout = () => {
  const location = useLocation();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50">
          <div className="sticky top-0 flex h-16 w-full justify-center bg-opacity-60 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-xl">
            <nav className="navbar w-full">
              <div className="navbar-start flex gap-3 md:gap-5 items-center">
                <div className="font-semibold text-primary text-lg md:text-2xl items-center">
                  <Link to="/">jobPortal</Link>
                </div>
                <div className="hidden md:block text-neutral items-center text-sm">
                  Find your dream job withing a couple of
                  minutes
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
