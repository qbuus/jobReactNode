import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomCheckbox from "./CustomCheckbox";
import NumberCheckbox from "./NumberCheckbox";
import StringCheckbox from "./StringCheckbox";
import {
  skills as skillToSelect,
  locations as locationsToSelect,
} from "../../config/OfferOptions.js";
import { useNewOfferMutation } from "../../Redux/Listing/offerApiSlice";
import {
  setErrorMessage,
  setMessage,
} from "../../Redux/states/messageSlice.js";

const NewOffer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageSelector = useSelector(
    (state) => state.messageData.message
  );
  const errorMessageSelector = useSelector(
    (state) => state.messageData.errorMessage
  );

  const [newOffer, { isSuccess, isLoading }] =
    useNewOfferMutation();

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

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch(setMessage(""));
        dispatch(setErrorMessage(""));
        navigate("/my-profile");
      }, 1000);
    }
  }, [isSuccess, navigate, dispatch]);

  async function NewOfferHandler(e) {
    e.preventDefault();

    try {
      await newOffer({
        company,
        title: title,
        position: position,
        description: description,
        location: location,
        salary: parseInt(salary),
        experience: parseInt(experience),
        skills: skills,
        workingHours: workingHours,
        contractType: contractType,
        workType: workType,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={NewOfferHandler}
    >
      {errorMessageSelector !== null ? (
        <div className="text-error font-normal text-sm">
          {errorMessageSelector}
        </div>
      ) : null}
      {messageSelector !== null ? (
        <div className="text-success-content font-semibold text-lg">
          {messageSelector}
        </div>
      ) : null}
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
          disabled={isLoading}
        />
      </div>
      <NumberCheckbox
        name={"Years of experience required"}
        value={experience}
        setValue={setExperience}
        max={"20"}
        min={"0"}
        step={1}
        textAfter={"YOE"}
      />
      <NumberCheckbox
        name={"Salary"}
        value={salary}
        setValue={setSalary}
        max={"100000"}
        min={"0"}
        step={1000}
        textAfter={"PLN / GROSS"}
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
      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-primary w-full md:w-max"
        >
          Create new offer
        </button>
      </div>
    </form>
  );
};

export default NewOffer;
