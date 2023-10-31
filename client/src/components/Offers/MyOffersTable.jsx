/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const MyOffersTable = ({ myOffersData }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
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
                key={data._id}
                onClick={() =>
                  navigate("/my-offers/offers/" + data._id, {
                    state: data,
                  })
                }
              >
                <th>{index + 1}</th>
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
