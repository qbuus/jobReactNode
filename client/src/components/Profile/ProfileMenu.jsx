import { useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProfileMenu = () => {
  const location = useLocation();
  const auth = useAuth();

  return (
    <div className="flex h-16 w-full justify-center backdrop-blur transition-all duration-100 bg-gradient-to-tr from-base-300 to-secondary">
      <div className="flex items-center justify-between sm:justify-center w-full text-base-content text-lg font-semibold sm:gap-16">
        <div className="m-1 sm:m-0 h-full flex items-center justify-center hover:cursor-pointer">
          <Link to="/my-profile">
            <div
              className={`${
                location.pathname === "/my-profile" &&
                "h-min px-0 border-t-2 border-b-2 border-info"
              }`}
            >
              My profile
            </div>
          </Link>
        </div>
        <div className="m-1 sm:m-0 h-full flex items-center justify-center hover:cursor-pointer">
          {auth.role === "Seeker" ? (
            <Link to="/my-applications">
              <div
                className={`${
                  location.pathname.startsWith(
                    "/my-applications"
                  ) &&
                  "h-min px-0 border-t-2 border-b-2 border-info"
                }`}
              >
                My applications
              </div>
            </Link>
          ) : null}
          {auth.role === "Recruiter" ? (
            <Link to="/my-offers">
              <div
                className={`${
                  location.pathname.startsWith("/my-offers") &&
                  "h-min px-0 border-t-2 border-b-2 border-info"
                }`}
              >
                My offers
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
