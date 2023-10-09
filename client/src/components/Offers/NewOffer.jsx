import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../FeatureComponents/Loader";
import { useDispatch, useSelector } from "react-redux";
import CustomCheckbox from "./CustomCheckbox";
import NumberCheckbox from "./NumberCheckbox";
import StringCheckbox from "./StringCheckbox";
import {
  skills as skillToSelect,
  locations as locationsToSelect,
} from "../../config/OfferOptions.js";

const NewOffer = () => {
  const [workType, setWorkType] = useState([]);
  const [workingHours, setWorkingHours] = useState([]);
  const [skills, setSkills] = useState([]);
  const [contractType, setContractType] = useState([]);
  const [location, setLocation] = useState([]);
  const [experience, setExperience] = useState(0);
  const [salary, setSalary] = useState(0);
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <StringCheckbox
        value={company}
        setValue={setCompany}
        name={"Your company name"}
        max={60}
        min={1}
      />
      <StringCheckbox
        value={title}
        setValue={setTitle}
        name={"Offer title"}
        max={60}
        min={1}
      />
      <StringCheckbox
        value={position}
        setValue={setPosition}
        name={"Position"}
        max={60}
        min={1}
      />
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">Description</h3>
        <textarea
          rows={4}
          className="px-2 rounded-lg"
          placeholder="Offer description. Max characters 500"
          minLength={1}
          maxLength={500}
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <NumberCheckbox
        name={"Years of experience required"}
        value={experience}
        setValue={setExperience}
        max={"20"}
        min={"0"}
        step={1}
      />
      <NumberCheckbox
        name={"Salary"}
        value={salary}
        setValue={setSalary}
        max={"100000"}
        min={"0"}
        step={1000}
      />
      <CustomCheckbox
        selected={workType}
        onChange={setWorkType}
        itemsNames={["remote", "hybrid", "office"]}
        name={"Work Type"}
      />
      <CustomCheckbox
        selected={contractType}
        onChange={setContractType}
        itemsNames={["uop", "b2b", "uz", "uod"]}
        name={"Contract Type"}
      />
      <CustomCheckbox
        selected={workingHours}
        onChange={setWorkingHours}
        itemsNames={["full-time", "part-time", "internship"]}
        name={"Working Hours"}
      />
      <CustomCheckbox
        selected={skills}
        onChange={setSkills}
        itemsNames={[...skillToSelect]}
        name={"Skills"}
      />
      <CustomCheckbox
        selected={location}
        onChange={setLocation}
        itemsNames={[...locationsToSelect]}
        name={"Location"}
      />
    </div>
  );
};

export default NewOffer;
