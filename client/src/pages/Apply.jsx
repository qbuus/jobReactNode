import { useParams } from "react-router-dom";
import {
  useJobApplicationMutation,
  useSingleOfferQuery,
} from "../Redux/Listing/offerApiSlice";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import {
  setErrorMessage,
  setMessage,
} from "../Redux/states/messageSlice";
import Loader from "../components/FeatureComponents/Loader";

const Apply = () => {
  const { id } = useParams();
  const { currentData, isFetching, isLoading } =
    useSingleOfferQuery(id);

  const dispatch = useDispatch();
  const messageSelector = useSelector(
    (state) => state.messageData.message
  );
  const errorMessageSelector = useSelector(
    (state) => state.messageData.errorMessage
  );

  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  const [jobApplication, { isError, isSuccess }] =
    useJobApplicationMutation();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch(setMessage(""));
      }, 2000);
    } else if (isError) {
      setTimeout(() => {
        dispatch(setErrorMessage(""));
      }, 2000);
    }
  }, [isSuccess, dispatch, isError]);

  async function Upload(e) {
    e.preventDefault();
    if (file && email && id && currentData !== undefined) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("file", file);
      formData.append("owner", currentData.singleOffer.owner);

      try {
        setSubmitted(true);
        await jobApplication(formData);
      } catch (error) {
        setSubmitted(false);
        console.log("Error");
      } finally {
        setSubmitted(false);
      }
    }
  }

  return (
    <div className="flex flex-col gap-6 mx-auto my-3 max-w-3xl w-full bg-base-100 p-1">
      {isLoading && <Loader />}
      {isFetching && !currentData && <Loader />}
      <div className="flex mx-auto font-bold text-2xl">
        <h3>Apply to this offer</h3>
      </div>
      <form
        onSubmit={Upload}
        className="flex flex-col gap-6 mx-auto max-w-3xl w-full bg-base-100 p-1"
      >
        <div className="flex flex-col gap-1">
          <div
            {...getRootProps()}
            className="flex bg-base-300 w-full max-w-max mx-auto p-2 rounded-md"
          >
            <input {...getInputProps()} />
            <p className="font-semibold text-base-content">
              Drag & drop a PDF file here, or click to select
              one
            </p>
          </div>
          {!file ? null : (
            <div className="flex font-semibold bg-base-300 max-w-max w-full p-2 mx-auto rounded-md">
              {file.name}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 mx-auto max-w-lg w-full">
          <label className="label">
            <span className="text-base label-text font-semibold">
              Email
            </span>
          </label>
          <input
            disabled={submitted}
            required
            value={email}
            onChange={handleEmailChange}
            type="email"
            placeholder="Email"
            className="input input-bordered max-w-lg w-full"
          />
        </div>
        <div className="flex mx-auto">
          <button
            type="submit"
            disabled={submitted}
            className="btn btn-primary btn-lg"
          >
            Apply
          </button>
        </div>
        <div className="flex gap-2 mx-auto">
          <input
            required
            type="checkbox"
            disabled={submitted}
          />
          <label>Consent for future recruitment process</label>
        </div>
        {errorMessageSelector !== null ? (
          <div className="text-error font-semibold text-md">
            {errorMessageSelector}
          </div>
        ) : null}
        {messageSelector !== null ? (
          <div className="text-success-content font-bold text-lg">
            {messageSelector}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Apply;
