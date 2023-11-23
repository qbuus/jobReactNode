import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllOffersBtn = () => {
  return (
    <div>
      <Link to="/all-offers">
        <button className="btn btn-md lg:btn-lg btn-primary">
          All offers
          <FaExternalLinkAlt />
        </button>
      </Link>
    </div>
  );
};

export default AllOffersBtn;
