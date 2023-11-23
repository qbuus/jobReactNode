import HighlightedOffers from "./HighlightedOffers";
import LatestOffers from "./LatestOffers";
import AllOffersBtn from "./AllOffersBtn";

const PublicMain = () => {
  return (
    <div className="flex flex-col gap-10 mt-8 mb-8 w-full max-w-6xl items-center m-auto">
      <AllOffersBtn />
      <LatestOffers />
      <HighlightedOffers />
    </div>
  );
};

export default PublicMain;
