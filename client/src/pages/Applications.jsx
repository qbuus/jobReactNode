import { useAllAppliedMutation } from "../Redux/Listing/offerApiSlice";
import { useEffect, useState } from "react";
import Loader from "../components/FeatureComponents/Loader";

const Applications = () => {
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

  console.log(!isLoading && data);

  return <div>Applications</div>;
};

export default Applications;
