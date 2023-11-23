import { skills } from "../../config/OfferOptions.js";
import { Link } from "react-router-dom";

const FilterMenu = () => {
  if (skills.length === 0)
    return (
      <p>There was some error displaying filter options</p>
    );

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() =>
          document.getElementById("filterModal").showModal()
        }
      >
        Filter offers
      </button>
      <dialog
        id="filterModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-h-96">
          <h3 className="font-bold text-lg mb-4">
            Filter by skill
          </h3>

          <div className="flex flex-nowrap sm:gap-6 gap-6 sm:flex-wrap flex-col sm:flex-row h-full w-full">
            {skills &&
              skills.map((skill, index) => (
                <button key={index} className="btn">
                  <Link
                    to={`?skill=${skill}&pageNumber=1`}
                    replace
                  >
                    {skill}
                  </Link>
                </button>
              ))}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default FilterMenu;
