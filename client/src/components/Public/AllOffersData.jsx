/* eslint-disable react/prop-types */
import CustomOfferBox from "./CustomOfferBox";
import { MdOutlineDataArray } from "react-icons/md";

const AllOffersData = ({ data }) => {
  let content;

  if (data.allOffers) {
    content = (
      <>
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
          {data.allOffers.map((data, index) => (
            <CustomOfferBox offerData={data} key={index} />
          ))}
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div className="flex flex-col gap-2 md-m-0 ml-3">
          <h4 className="text-center font-semibold text-xl">
            {data.message}
          </h4>
          <div className="flex gap-2 justify-center font-semibold text-lg">
            <p>Count:</p>
            <span className="text-center bg-primary px-1 text-base-100 font-semibold text-md">
              {data.count}
            </span>
          </div>
        </div>
      </>
    );
  }

  function ContentWrapper() {
    return (
      <div className="flex flex-col gap-4 w-full sm:pl-5 sm:pr-5">
        {content}
      </div>
    );
  }

  return <ContentWrapper />;
};

export default AllOffersData;
