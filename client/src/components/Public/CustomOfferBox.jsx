/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const CustomOfferBox = ({ offerData }) => {
  return (
    <>
      <Link to={`/offer/${offerData._id}`}>
        <div className="bg-base-100 w-full flex justify-between md:gap-6 gap-5 px-1 pl-3 pr-3 pt-3 pb-3 sm:rounded-md cursor-pointer hover:bg-base-200">
          <div className="flex items-center border-2 px-1">
            {offerData.company}
          </div>
          <div className="flex grow md:gap-6 gap-1 flex-col md:flex-row md:items-center">
            <div className="uppercase lg:text-lg md:text-md font-semibold">
              {offerData.title}
            </div>
            <div className="flex gap-1 border px-1 md:text-lg text-md w-max">
              <span className="">
                {offerData.salary} PLN/GROSS
              </span>
            </div>
            <div className="flex flex-row md:gap-1 gap-2">
              {offerData.workType.length < 1
                ? offerData.workType[0]
                : offerData.workType.map((type, index) => (
                    <h5
                      key={index}
                      className="border px-1 md:text-lg text-md"
                    >
                      {type}
                    </h5>
                  ))}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-md">Experience</p>
            <span className="bg-primary px-1 text-base-100 font-semibold text-md">
              {offerData.experience}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CustomOfferBox;
