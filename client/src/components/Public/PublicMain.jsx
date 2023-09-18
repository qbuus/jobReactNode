import useAuth from "../../hooks/useAuth";

const PublicMain = () => {
  const auth = useAuth();

  console.log(auth);

  return (
    <>
      <div>{!auth?.username ? 123 : auth.username}</div>
    </>
  );
};

export default PublicMain;
