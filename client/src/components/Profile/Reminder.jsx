import { MdWorkOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Reminder = () => {
  const auth = useAuth();

  return (
    <div className="flex justify-center items-center flex-col gap-3 p-3 m-auto bg-base-100 rounded-md shadow-md">
      <div className="flex justify-between items-center sm:flex-row flex-col">
        <div>
          <MdWorkOutline size={34} />
        </div>
        <div className="flex grow md:text-lg text-md items-center justify-center">
          {auth.role === "Seeker"
            ? "Look for more job opening"
            : null}
          {auth.role === "Recruiter"
            ? "Add new job offer"
            : null}
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        {auth.role === "Seeker" ? (
          <Link to="/all-offers">
            <button className="btn">Job offers</button>
          </Link>
        ) : null}
        {auth.role === "Recruiter" ? (
          <Link to="/my-offers/create-new-offer">
            <button className="btn">New offer</button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Reminder;
