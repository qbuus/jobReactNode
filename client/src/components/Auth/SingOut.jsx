import { useSignOutMutation } from "../../Redux/Auth/authApiSlice";
import Loader from "../FeatureComponents/Loader";

const SignOut = () => {
  const [signOut, { isLoading }] = useSignOutMutation();

  async function handleSignOut(e) {
    e.preventDefault();

    try {
      await signOut();
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
