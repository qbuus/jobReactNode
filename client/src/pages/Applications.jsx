import { useAllAppliedMutation } from "../Redux/Listing/offerApiSlice";
import { useEffect, useState } from "react";
import Loader from "../components/FeatureComponents/Loader";
import dateFormat from "../components/FeatureComponents/dateFormat";
import { useNavigate, Link } from "react-router-dom";

const Applications = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [
    allApplied,
    { isError, isSuccess, isLoading, status },
  ] = useAllAppliedMutation();

  useEffect(() => {
    async function LoadApplied() {
      try {
        const data = await allApplied();
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    LoadApplied();
  }, []);

  let content;

  if (!isLoading && isSuccess && status === "fulfilled") {
    content = (
      <div className="overflow-x-auto">
        <table className="table table-xs sm:table-md md:table-lg">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Created At</th>
              <th>Company</th>
              <th>Experience</th>
              <th>Position</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((data, index) => (
                <tr
                  className="hover cursor-pointer"
                  onClick={() =>
                    navigate("/offer/" + data._id, {
                      state: data,
                    })
                  }
                  key={data._id}
                >
                  <th>{index + 1}</th>
                  <td>{dateFormat(data.createdAt)}</td>
                  <td>{data.company}</td>
                  <td>{data.experience}</td>
                  <td>{data.position}</td>
                  <td>{data.salary}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  } else if (isError && !isLoading && status === "rejected") {
    content = (
      <>
        <div className="min-h-screen flex flex-grow items-center justify-center bg-base-300">
          <div className="rounded-lg bg-base-100 p-16 text-center shadow-xl">
            <h1 className="mb-4 text-5xl font-bold">404</h1>
            <p className="text-lg">
              Oops! The page you are looking for could not be
              found.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block rounded bg-primary px-6 py-3 font-semibold text-primary-content text-xl"
            >
              Go back to home
            </Link>
          </div>
        </div>
      </>
    );
  } else if (isLoading) {
    content = (
      <>
        <Loader />
      </>
    );
  }

  return content;
};

export default Applications;
