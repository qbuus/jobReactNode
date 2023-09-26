import useAuth from "../hooks/useAuth";

const Profile = () => {
  const auth = useAuth();

  return (
    <>
      <p>{auth.userID}</p>
    </>
  );
};

export default Profile;
