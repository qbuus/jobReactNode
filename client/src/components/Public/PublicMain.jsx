import useAuth from "../../hooks/useAuth";

const PublicMain = () => {
  const auth = useAuth();

  return (
    <>
      <div>{!auth?.email ? 123 : auth.email}</div>
    </>
  );
};

export default PublicMain;
