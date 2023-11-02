import { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StringCheckbox from "./StringCheckbox";
import CustomCheckbox from "./CustomCheckbox";
import NumberCheckbox from "./NumberCheckbox";
import {
  skills as skillToSelect,
  locations as locationsToSelect,
} from "../../config/OfferOptions.js";
import {
  setErrorMessage,
  setMessage,
} from "../../Redux/states/messageSlice.js";
import {
  useEditOfferMutation,
  useDeleteOfferMutation,
} from "../../Redux/Listing/offerApiSlice";

const SingleOfferPage = () => {
  const params = useParams();
  const offerId = params.id;
  let status;

  const [deleteOffer] = useDeleteOfferMutation();

  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageSelector = useSelector(
    (state) => state.messageData.message
  );
  const errorMessageSelector = useSelector(
    (state) => state.messageData.errorMessage
  );

  const [editOffer, { isLoading, isSuccess }] =
    useEditOfferMutation();

  const [workType, setWorkType] = useState(state.workType);
  const [workingHours, setWorkingHours] = useState(
    state.workingHours
  );
  const [skills, setSkills] = useState(state.skills);
  const [contractType, setContractType] = useState(
    state.contractType
  );
  const [location, setLocation] = useState(state.location);
  const [experience, setExperience] = useState(
    state.experience
  );
  const [salary, setSalary] = useState(state.salary);
  const [description, setDescription] = useState(
    state.description
  );
  const [position, setPosition] = useState(state.position);
  const [title, setTitle] = useState(state.title);
  const [company, setCompany] = useState(state.company);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch(setMessage(""));
        dispatch(setErrorMessage(""));
        navigate("/");
      }, 1000);
    }
  }, [isSuccess, navigate, dispatch]);

  const offerData = {
    id: offerId,
    company: company,
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
  };

  const EditOfferHandler = async (e) => {
    e.preventDefault();

    try {
      await editOffer(offerData);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteOfferHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await deleteOffer({ id: offerId });
      status = data.data.status;

      if (status === 200) {
        setTimeout(() => {
          dispatch(setMessage(""));
          dispatch(setErrorMessage(""));
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={EditOfferHandler}
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
            Edit this offer
          </button>
        </div>
      </form>
      <button
        type="button"
        className="btn btn-secondary w-full md:w-max mt-3"
        onClick={DeleteOfferHandler}
      >
        Delete
      </button>
    </>
  );
};

export default SingleOfferPage;
