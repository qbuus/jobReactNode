/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import dateFormat from "../FeatureComponents/dateFormat";

const MyOffersTable = ({ myOffersData }) => {
  const navigate = useNavigate();

  console.log(myOffersData);

  return (
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
          {myOffersData &&
            myOffersData.map((data, index) => (
              <tr
                className="hover cursor-pointer"
                onClick={() =>
                  navigate("/my-offers/offers/" + data._id, {
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
};

export default MyOffersTable;
