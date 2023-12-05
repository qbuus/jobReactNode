/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import { useRelatedOffersQuery } from "../../Redux/Listing/offerApiSlice";
import Loader from "../FeatureComponents/Loader";

const RelatedOffers = () => {
  const params = useParams();
  const offerId = params.id;

  const { currentData, isLoading, isFetching, isError } =
    useRelatedOffersQuery(offerId);

  let content;

  if (isLoading) return <Loader />;

  if (isFetching && !currentData) return <Loader />;

  if (isError) {
    content = <p>Related offers not found</p>;
  }

  if (currentData !== undefined) {
    content = (
      <>
        <div className="flex flex-col gap-3 max-w-4xl md:mx-auto px-1 py-3 md:px-3 w-full">
          <h5 className="font-semibold text-lg">
            {currentData.message}
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
            {currentData.relatedOffers &&
              currentData.relatedOffers.map((val, index) => (
                <CustomRelatedBox key={index} data={val} />
              ))}
          </div>
        </div>
      </>
    );
  }

  function CustomRelatedBox({ data }) {
    return (
      <Link to={`/offer/${data._id}`}>
        <div className="bg-base-100 w-full flex flex-col gap-3 px-1 pl-3 pr-3 pt-3 pb-3 sm:rounded-md cursor-pointer hover:bg-base-200 items-center sm:items-start">
          <div className="font-semibold text-xl text-warning">
            {data.company}
          </div>
          <div className="font-semibold text-xl text-accent">
            {data.position}
          </div>
          <div className="font-semibold text-xl text-secondary">
            {data.salary}$
          </div>
          <div className="font-semibold text-xl text-primary">
            experience: {data.experience}
          </div>
        </div>
      </Link>
    );
  }

  return content;
};

export default RelatedOffers;
