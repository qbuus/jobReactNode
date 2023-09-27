import { MdWorkOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const Reminder = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-3 p-3 m-auto bg-base-100 rounded-md shadow-md">
      <div className="flex justify-between items-center sm:flex-row flex-col">
        <div>
          <MdWorkOutline size={34} />
        </div>
        <div className="flex grow md:text-lg text-md items-center justify-center">
          Most recent job offers
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <Link to="/">
          <button className="btn">Job offers</button>
        </Link>
      </div>
    </div>
  );
};

export default Reminder;
