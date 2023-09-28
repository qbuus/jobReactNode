import { useEditDataMutation } from "../../Redux/Auth/authApiSlice";
import { useState, useEffect } from "react";
import Roles from "../FeatureComponents/Roles";
import { useSelector, useDispatch } from "react-redux";
import {
  setErrorMessage,
  setMessage,
} from "../../Redux/states/messageSlice";

const ProfileModal = ({ name, data }) => {
  const [editData, { isLoading, isSuccess }] =
    useEditDataMutation();
  const [formData, setFormData] = useState({
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    role: data?.role,
  });

  const dispatch = useDispatch();

  const messageSelector = useSelector(
    (state) => state.messageData.message
  );
  const errorMessageSelector = useSelector(
    (state) => state.messageData.errorMessage
  );

  const { firstName, lastName, email, role } = formData;

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch(setMessage(""));
        dispatch(setErrorMessage(""));
      }, 2000);
    }
  }, [isSuccess, dispatch]);

  async function handleDataChange(e) {
    e.preventDefault();

    try {
      await editData(formData);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(formData);

  return (
    <dialog
      id={`${name}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-semibold text-2xl mb-3">My data</h3>

        <form
          onSubmit={handleDataChange}
          id="editUserDataForm"
          className="flex flex-col gap-3 overflow-y-auto"
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
          <div>
            <label className="label">
              <span className="text-base label-text font-semibold">
                First Name
              </span>
            </label>
            <input
              autoComplete="on"
              disabled={isLoading}
              onChange={handleInputChange}
              value={firstName}
              name="firstName"
              type="text"
              placeholder="First name"
              className="input input-bordered input-primary md:min-w-max w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text font-semibold">
                Last Name
              </span>
            </label>
            <input
              autoComplete="on"
              disabled={isLoading}
              onChange={handleInputChange}
              value={lastName}
              name="lastName"
              type="text"
              placeholder="lastName"
              className="input input-bordered input-primary md:min-w-max w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text font-semibold">
                Email
              </span>
            </label>
            <input
              autoComplete="on"
              disabled={isLoading}
              onChange={handleInputChange}
              value={email}
              name="email"
              type="email"
              placeholder="@"
              className="input input-bordered input-primary md:min-w-max w-full"
            />
          </div>
          <div>
            <Roles
              change={handleInputChange}
              value={role}
              disabled={isLoading}
            />
          </div>
        </form>

        <div className="modal-action">
          <button
            disabled={isLoading}
            type="submit"
            form="editUserDataForm"
            className="btn btn-primary"
          >
            Save data
          </button>
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ProfileModal;
