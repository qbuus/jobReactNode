import { useEffect, useState } from "react";
import { useMyOffersQuery } from "../../Redux/Listing/offerApiSlice";
import Loader from "../FeatureComponents/Loader";
import MyOffersTable from "./MyOffersTable";

const MyOffers = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isError, isFetching, isSuccess } =
    useMyOffersQuery(pageNumber);

  function NextPageHandler() {
    if (data.pages === pageNumber) {
      setPageNumber(data.pages);
    } else if (data.pages > pageNumber) {
      setPageNumber((prev) => prev + 1);
    }
  }

  function PreviousPageHandler() {
    if (pageNumber === 1) {
      setPageNumber(1);
    } else {
      setPageNumber((prev) => prev - 1);
    }
  }

  return (
    <>
      {isLoading && isFetching && <Loader />}
      {isSuccess && (
        <div className="flex flex-col gap-8 items-center">
          <div className="flex gap-2 font-semibold text-xl">
            <span className="flex items-center justify-center rounded-md px-1 bg-gradient-to-tr from-base-300 to-secondary">
              {data.count}
            </span>
            offers found
          </div>
          <div>
            <MyOffersTable myOffersData={data.userOffers} />
          </div>
          <div className="join">
            <button
              className="join-item btn"
              onClick={PreviousPageHandler}
            >
              «
            </button>
            <button className="join-item btn">
              {data.currentPage}
            </button>
            <button
              className="join-item btn"
              onClick={NextPageHandler}
            >
              »
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOffers;
