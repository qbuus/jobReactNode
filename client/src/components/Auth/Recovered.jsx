import { Link } from "react-router-dom";

const Recovered = () => {
  return (
    <>
      <div className="flex mb-3 flex-col items-center justify-center">
        <h1 className="text-success font-semibold text-lg">
          Password successfully set
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <Link to="/login">
          <button className="btn btn-primary">
            Back to sign in page
          </button>
        </Link>
      </div>
    </>
  );
};

export default Recovered;
