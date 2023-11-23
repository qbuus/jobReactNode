import { useEffect } from "react";
import { useHighlightedOfferMutation } from "../../Redux/Listing/offerApiSlice";
import CustomOfferBox from "./CustomOfferBox";
import { FaChartLine } from "react-icons/fa";

const HighlightedOffers = () => {
  const [highlightedOffer, { isLoading, data }] =
    useHighlightedOfferMutation();

  useEffect(() => {
    loadHighlightedOffers();
  }, []);

  async function loadHighlightedOffers() {
    await highlightedOffer();
  }

  return (
    <div className="flex flex-col gap-4 w-full sm:pl-5 sm:pr-5">
      <div className="flex gap-2 md:m-0 ml-3">
        <div className="flex items-center">
          <FaChartLine
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
        {isLoading ? (
          <span className="loading loading-spinner text-info"></span>
        ) : null}
        {!isLoading && data?.data.length > 0 ? (
          data.data.map((data, index) => (
            <CustomOfferBox offerData={data} key={index} />
          ))
        ) : (
          <p className="text-xl text-error-content">
            No highlighted offers found
          </p>
        )}
      </div>
    </div>
  );
};

export default HighlightedOffers;
