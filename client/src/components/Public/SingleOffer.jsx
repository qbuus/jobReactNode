/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useSingleOfferQuery } from "../../Redux/Listing/offerApiSlice";
import Loader from "../FeatureComponents/Loader";
import dateFormat from "../FeatureComponents/dateFormat";
import RelatedOffers from "./RelatedOffers";

const SingleOffer = () => {
  const params = useParams();
  const offerId = params.id;

  const { currentData, isLoading, isFetching, isError } =
    useSingleOfferQuery(offerId);

  let content;

  if (isLoading) return <Loader />;

  if (isFetching && !currentData) return <Loader />;

  if (isError) {
    content = <p>Offer not found</p>;
  }

  if (currentData !== undefined) {
    const data = currentData.singleOffer;
    content = (
      <>
        <div className="flex flex-col gap-6 w-full my-6">
          <div className="flex flex-col h-min bg-base-100 max-w-4xl gap-6 md:mx-auto px-1 py-3 md:px-3 w-full">
            <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-6 sm:gap-12">
              <button className="btn btn-primary sm:btn-lg px-12 sm:px-6">
                Apply
              </button>
              <button className="btn btn-secondary sm:btn-lg px-12 sm:px-6">
                Save
              </button>
            </div>
            <Wrapper>
              <div className="flex gap-1 sm:flex-row flex-col">
                <h5 className="flex items-center text-lg font-semibold">
                  Date of creation:
                </h5>
                <span className="border px-1 md:text-lg text-md w-max">
                  {dateFormat(data.createdAt)}
                </span>
              </div>
              <hr />
            </Wrapper>
            <Wrapper>
              <div className="flex gap-1 sm:flex-row flex-col">
                <h5 className="flex items-center text-lg font-semibold">
                  Title:
                </h5>
                <span className="border px-1 md:text-lg text-md w-max">
                  {data.title}
                </span>
              </div>
              <hr />
            </Wrapper>
            <Wrapper>
              <div className="flex gap-1 sm:flex-row flex-col">
                <h5 className="flex items-center text-lg font-semibold">
                  Company name:
                </h5>
                <span className="border px-1 md:text-lg text-md w-max">
                  {data.company}
                </span>
              </div>
              <hr />
            </Wrapper>
            <Wrapper>
              <div className="flex gap-1 sm:flex-row flex-col">
                <h5 className="flex items-center text-lg font-semibold">
                  Position:
                </h5>
                <span className="border px-1 md:text-lg text-md w-max">
                  {data.position}
                </span>
              </div>
              <hr />
            </Wrapper>
            <Wrapper>
              <div className="flex gap-1 sm:flex-row flex-col">
                <h5 className="flex items-center text-lg font-semibold">
                  Minimum salary:
                </h5>
                <span className="border px-1 md:text-lg text-md w-max">
                  {data.salary}$
                </span>
              </div>
              <hr />
            </Wrapper>
            <Wrapper>
              <div className="flex gap-1 sm:flex-row flex-col">
                <h5 className="flex items-center text-lg font-semibold">
                  Minimum experience in years:
                </h5>
                <span className="border px-1 md:text-lg text-md w-max">
                  {data.experience}
                </span>
              </div>
              <hr />
            </Wrapper>
            <Wrapper>
              <div className="flex gap-1 sm:flex-row flex-col">
                <h5 className="flex items-center text-lg font-semibold">
                  Contract type:
                </h5>
                {data.contractType.length < 1
                  ? data.contractType[0]
                  : data.contractType.map((type, index) => (
                      <h6
                        key={index}
                        className="border px-1 md:text-lg text-md w-max"
                      >
                        {type}
                      </h6>
                    ))}
              </div>
              <hr />
            </Wrapper>
            <Wrapper>
              <div className="flex gap-1 sm:flex-row flex-col">
                <h5 className="flex items-center text-lg font-semibold">
                  Location:
                </h5>
                {data.location.length < 1
                  ? data.location[0]
                  : data.location.map((type, index) => (
                      <h6
                        key={index}
                        className="border px-1 md:text-lg text-md w-max"
                      >
                        {type}
                      </h6>
                    ))}
              </div>
              <hr />
            </Wrapper>
            <Wrapper>
              <div className="flex gap-1 sm:flex-row flex-col">
                <h5 className="flex items-center text-lg font-semibold">
                  Work type:
                </h5>
                {data.workType.length < 1
                  ? data.workType[0]
                  : data.workType.map((type, index) => (
                      <h6
                        key={index}
                        className="border px-1 md:text-lg text-md w-max"
                      >
                        {type}
                      </h6>
                    ))}
              </div>
              <hr />
            </Wrapper>
            <Wrapper>
              <div className="flex gap-1 sm:flex-row flex-col">
                <h5 className="flex items-center text-lg font-semibold">
                  Required skills:{" "}
                </h5>
                {data.skills.length < 1
                  ? data.skills[0]
                  : data.skills.map((type, index) => (
                      <h6
                        key={index}
                        className="border px-1 md:text-lg text-md w-max"
                      >
                        {type}
                      </h6>
                    ))}
              </div>
              <hr />
            </Wrapper>
            <Wrapper>
              <div className="flex gap-1 sm:flex-row flex-col">
                <h5 className="flex items-center text-lg font-semibold">
                  Working hours:
                </h5>
                {data.workingHours.length < 1
                  ? data.workingHours[0]
                  : data.workingHours.map((type, index) => (
                      <h6
                        key={index}
                        className="border px-1 md:text-lg text-md w-max"
                      >
                        {type}
                      </h6>
                    ))}
              </div>
              <hr />
            </Wrapper>
            <Wrapper>
              <h5 className="flex items-center text-lg font-semibold">
                Description:
              </h5>
              <p className="border px-1 md:text-lg text-md w-max">
                {data.description}
              </p>
            </Wrapper>
          </div>

          <RelatedOffers />
        </div>
      </>
    );
  }

  function Wrapper({ children }) {
    return (
      <div className="flex flex-col gap-4">{children}</div>
    );
  }

  return content;
};

export default SingleOffer;
