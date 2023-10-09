import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Offers = () => {
  const auth = useAuth();

  let content;

  if (auth.role === "Recruiter") {
    return (
      <div className="flex flex-col w-full lg:flex-row">
        <div className="flex w-full flex-col justify-between flex-grow h-64 card bg-base-100 rounded-box lg:h-96">
          <div className="h-full flex bg-gradient-to-br from-base-300 to-primary-focus hover:bg-gradient-to-br hover:from-primary-focus hover:to-base-300">
            <div className="flex w-full justify-center items-center">
              <Link
                to="offers"
                className="flex items-center p-3 bg-base-100 rounded-md shadow-md text-2xl hover:bg-base-300 font-semibold"
              >
                <div>My job offers</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal">OR</div>

        <div className="flex w-full flex-col justify-between flex-grow h-64 card bg-base-100 rounded-box lg:h-96">
          <div className="h-full flex bg-gradient-to-br from-base-300 to-primary-focus hover:bg-gradient-to-br hover:from-primary-focus hover:to-base-300">
            <div className="flex w-full justify-center items-center">
              <Link
                to="create-new-offer"
                className="flex items-center p-3 bg-base-100 rounded-md shadow-md text-2xl hover:bg-base-300 font-semibold"
              >
                <div>Create new job offer</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <Navigate to="/login" replace state={{ from: location }} />;
  }

  return content;
};

export default Offers;
