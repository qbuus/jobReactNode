import ProfileCard from "../components/Profile/ProfileCard";
import Reminder from "../components/Profile/Reminder";

const Profile = () => {
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-center justify-between items-center gap-6 sm:gap-12">
        <div className="grow flex justify-center items-center w-full">
          <ProfileCard />
        </div>
        <div className="flex items-start sm:justify-center">
          <Reminder />
        </div>
      </div>
    </>
  );
};

export default Profile;
