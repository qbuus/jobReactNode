/* eslint-disable react/prop-types */
import React from "react";
import { HiMiniEye } from "react-icons/hi2";
import { FaNoteSticky } from "react-icons/fa6";

const Roles = ({ selected, onChange }) => {
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([
        ...selected.filter(
          (selectedName) => selectedName !== name
        ),
      ]);
    }
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={selected.includes("")}
          name=""
          onChange={handleCbClick}
        />
        <HiMiniEye />
        <span>Seeker</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={selected.includes("")}
          name=""
          onChange={handleCbClick}
        />
        <FaNoteSticky />
        <span>Recruiter</span>
      </label>
    </>
  );
};

export default Roles;
``;
