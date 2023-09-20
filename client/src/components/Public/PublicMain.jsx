import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const PublicMain = () => {
  const auth = useAuth();

  return (
    <>
      <div>{!auth?.email ? 123 : auth.email}</div>

      <button className="btn m-auto">
        <Link to="/test">Route Test</Link>
      </button>
    </>
  );
};

export default PublicMain;
