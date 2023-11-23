import { useLocation } from "react-router-dom";
import { useAllOfferQuery } from "../Redux/Listing/offerApiSlice";
import Loader from "../components/FeatureComponents/Loader";
import FilterMenu from "../components/Public/FilterMenu";
import FilterPagination from "../components/Public/FilterPagination";
import AllOffersData from "../components/Public/AllOffersData";

const OfferFilter = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const currentSkill = queryParams.get("skill") || "";
  const currentPageNumber = queryParams.get("pageNumber") || 1;

  const { currentData, isLoading, isFetching } =
    useAllOfferQuery(
      {
        pageNumber: currentPageNumber,
        skill: currentSkill,
      },
      { refetchOnMountOrArgChange: true }
    );

  if (isLoading) return <Loader />;

  if (isFetching && !currentData) return <Loader />;

  return (
    <div className="flex flex-col gap-10 mt-8 mb-8 w-full max-w-6xl items-center m-auto">
      <FilterMenu />
      <AllOffersData data={currentData} />
      <FilterPagination maxPage={currentData.pages} />
    </div>
  );
};

export default OfferFilter;
