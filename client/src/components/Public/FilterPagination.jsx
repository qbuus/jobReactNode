/* eslint-disable react/prop-types */
import { useLocation, Link } from "react-router-dom";

const FilterPagination = ({ maxPage }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const currentSkill = queryParams.get("skill")
    ? queryParams.get("skill")
    : "";
  const currentPageNumber = queryParams.get("pageNumber")
    ? queryParams.get("pageNumber")
    : 1;

  return (
    <div className="join">
      <button className="join-item btn">
        <Link
          to={`?skill=${currentSkill}&pageNumber=${
            currentPageNumber <= 1 ? 1 : currentPageNumber - 1
          }`}
          replace
        >
          «
        </Link>
      </button>
      <button className="join-item btn">
        {currentPageNumber}
      </button>
      <button className="join-item btn">
        <Link
          to={`?skill=${currentSkill}&pageNumber=${
            currentPageNumber >= maxPage
              ? maxPage
              : currentPageNumber + 1
          }`}
          replace
        >
          »
        </Link>
      </button>
    </div>
  );
};

export default FilterPagination;
