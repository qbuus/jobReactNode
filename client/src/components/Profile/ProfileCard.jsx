import { useEffect, useState } from "react";
import { useUserDataMutation } from "../../Redux/Auth/authApiSlice";
import Loader from "../FeatureComponents/Loader";
import ProfileModal from "./ProfileModal";

const ProfileCard = () => {
  const [data, setData] = useState(null);
  const [userData, { isLoading, isSuccess }] =
    useUserDataMutation();
  const [trueSuccess, setTrueSuccess] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      try {
        const data = await userData();
        setTrueSuccess(true);
        setData(data && data.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadUserData();
  }, []);

  return (
    <div className="card card-compact max-w-3xl w-full bg-base-100 shadow-xl">
      {isLoading && !trueSuccess && <Loader />}
      <div className="flex justify-between items-center m-2">
        <div>
          <p className="font-semibold text-2xl sm:text-3xl">
            My data
          </p>
        </div>
        <div>
          <button
            className="btn"
            onClick={() =>
              document
                .getElementById("userDataModal")
                .showModal()
            }
          >
            Edit
          </button>
          {trueSuccess && (
            <ProfileModal data={data} name={"userDataModal"} />
          )}
        </div>
      </div>
      <div className="grow card-body grid grid-cols-1 gap-8 sm:grid-cols-2">
        {isSuccess && data && !isLoading && (
          <>
            {Object.keys(data).map((key, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 md:items-center"
              >
                <label className="text-md">{key}</label>
                <span className="text-2xl text-primary-focus">
                  {data[key]}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
