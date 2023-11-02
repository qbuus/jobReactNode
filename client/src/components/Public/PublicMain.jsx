import { useLatestOfferMutation } from "../../Redux/Listing/offerApiSlice";
import LatestOffers from "./LatestOffers";
import { useEffect } from "react";

const PublicMain = () => {
  const [latestOffer, { isLoading, data }] =
    useLatestOfferMutation();

  useEffect(() => {
    async function latestOffersHandler() {
      try {
        await latestOffer();
      } catch (error) {
        console.error(error);
      }
    }
    latestOffersHandler();
  }, []);

  return (
    <div className="flex flex-col gap-12 mt-10 mb-10 w-full max-w-6xl items-center m-auto">
      <LatestOffers data={data} isLoading={isLoading} />
      <div className="">2</div>
    </div>
  );
};

export default PublicMain;
