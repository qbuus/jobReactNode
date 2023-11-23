/* eslint-disable react/prop-types */
import CustomOfferBox from "./CustomOfferBox";
import { MdOutlineDataArray } from "react-icons/md";

const AllOffersData = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 w-full sm:pl-5 sm:pr-5">
      <div className="flex gap-2 md:m-0 ml-3">
        <div className="flex items-center">
          <MdOutlineDataArray
            size={35}
            className="text-base-content"
          />
        </div>
        <div className="flex items-center">
          <h2 className="font-semibold text-2xl">
            Highlighted offers
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {data?.allOffers.map((data, index) => (
          <CustomOfferBox offerData={data} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AllOffersData;
