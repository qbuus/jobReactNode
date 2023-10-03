import { Link } from "react-router-dom";

const Recovered = () => {
  return (
    <>
      <div className="flex items-center justify-center lg:justify-start">
        <h1>Password successfully set</h1>
      </div>
      <div className="flex items-center">
        <Link to="/login">Navigate to sign in page</Link>
      </div>
    </>
  );
};

export default Recovered;
