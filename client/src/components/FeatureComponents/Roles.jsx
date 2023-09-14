/* eslint-disable react/prop-types */
import React from "react";

const Roles = ({ value, change }) => {
  const SelectRole = () => {
    return (
      <>
        <label className="label">
          <span className="text-base label-text font-semibold">
            Choose your role
          </span>
        </label>
        <select
          onChange={change}
          value={value}
          name="role"
          className="select select-bordered select-primary md:min-w-max w-full"
        >
          <option value="Seeker">Seeker</option>
          <option value="Recruiter">Recruiter</option>
        </select>
        <label className="label -mt-2">
          <p className="label-text font-semibold text-sm md:text-md">
            If not specified{" "}
            <span className="text-primary">seeker </span>
            will be chosen
          </p>
        </label>
      </>
    );
  };

  return (
    <>
      <SelectRole />
    </>
  );
};

export default Roles;
``;
