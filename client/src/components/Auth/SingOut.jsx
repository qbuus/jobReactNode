import { useSignOutMutation } from "../../Redux/Auth/authApiSlice";
import Loader from "../FeatureComponents/Loader";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  const [signOut, { isLoading, isSuccess }] =
    useSignOutMutation();

  async function handleSignOut(e) {
    e.preventDefault();

    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isLoading ? <Loader /> : null}
      <button disabled={isLoading} onClick={handleSignOut}>
        Sign out
      </button>
    </>
  );
};

export default SignOut;