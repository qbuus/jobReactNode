import RegisterForm from "./RegiserForm";
import { Link } from "react-router-dom";
import {
  BiMoneyWithdraw,
  BiSolidContact,
  BiStar,
  BiSearch,
} from "react-icons/bi";
import { useLoginMutation } from "../../Redux/Auth/authApiSlice";
import Loader from "../FeatureComponents/Loader";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const RegisterNewUser = () => {
  const title = "Sign up";
  const description = "Create a new account";
  useDocumentTitle({ title, description });

  const { isLoading } = useLoginMutation();

  return (
    <div className="relative grow flex flex-col md:flex-row">
      {/* Loader */}
      {isLoading ? <Loader /> : null}

      {/*Register */}
      <div className="flex flex-col gap-4 md:grow grow-0 px-10 py-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-normal">
            Register new account
          </h2>
        </div>
        <div className="flex flex-col gap-1 text-md lg:text-lg">
          <p className="font-bold">Already have an account ?</p>
          <b className="hover:cursor-pointer text-accent max-w-max btn-ghost rounded-lg">
            <Link to="/login">
              <button>login</button>
            </Link>
          </b>
        </div>
        <div>
          <div className="flex flex-col overflow-hidden">
            <div className="w-full p-4 m-auto bg-base-100 rounded-md shadow-md">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Look */}
      <div className="grow-0 md:grow flex flex-col justify-center font-bold px-10 py-6 gap-4 bg-gradient-to-br from-base-300 to-primary-focus">
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          <div className="bg-base-100 rounded-md shadow-md p-4 w-full m-auto">
            <div className="flex flex-col justify-between min-h-[200px] md:min-h-[220px]">
              <div className="flex justify-center">
                <BiMoneyWithdraw className="w-11 h-11" />
              </div>
              <div className="flex justify-center">
                <h3 className="font-normal text-md text-center">
                  Attractive financial conditions
                </h3>
              </div>
              <div className="flex justify-center">
                <p className="font-normal text-center text-lg">
                  Statistically we have the highest paying
                  offers
                </p>
              </div>
            </div>
          </div>
          <div className="bg-base-100 rounded-md shadow-md p-4 w-full m-auto">
            <div className="flex flex-col justify-between min-h-[200px] md:min-h-[220px]">
              <div className="flex justify-center">
                <BiSearch className="w-11 h-11" />
              </div>
              <div className="flex justify-center">
                <h3 className="font-normal text-md text-center">
                  Friendly UI
                </h3>
              </div>
              <div className="flex justify-center">
                <p className="font-normal text-center text-lg">
                  Find your dream offer easier with our user
                  friendly menu
                </p>
              </div>
            </div>
          </div>
          <div className="bg-base-100 rounded-md shadow-md p-4 w-full m-auto">
            <div className="flex flex-col justify-between min-h-[200px] md:min-h-[220px]">
              <div className="flex justify-center">
                <BiSolidContact className="w-11 h-11" />
              </div>
              <div className="flex justify-center">
                <h3 className="font-normal text-md text-center">
                  Apply to any company without any problems
                </h3>
              </div>
              <div className="flex justify-center">
                <p className="font-normal text-center text-lg">
                  Filling out a job application takes up to 10
                  minutes
                </p>
              </div>
            </div>
          </div>
          <div className="bg-base-100 rounded-md shadow-md p-4 w-full m-auto">
            <div className="flex flex-col justify-between min-h-[200px] md:min-h-[220px]">
              <div className="flex justify-center">
                <BiStar className="w-11 h-11" />
              </div>
              <div className="flex justify-center">
                <h3 className="font-normal text-md text-center">
                  Find the best applicants
                </h3>
              </div>
              <div className="flex justify-center">
                <p className="font-normal text-center text-lg">
                  We are the fastest growing job search portal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterNewUser;
