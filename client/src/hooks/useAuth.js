import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector((state) => state.userData.token);
  let isSeeker = false;
  let isRecruiter = false;
  let status = "Seeker";
  let userID = "";

  if (token) {
    const decoded = jwtDecode(token);
    const { role, id } = decoded;

    isSeeker = role.includes("Seeker");
    isRecruiter = role.includes("Recruiter");

    if (isSeeker) status = "Seeker";
    if (isRecruiter) status = "Recruiter";

    userID = id;

    return {
      role,
      status,
      isSeeker,
      isRecruiter,
      userID,
    };
  }

  return {
    role: "",
    isRecruiter,
    isSeeker,
    status,
    userID,
  };
};
export default useAuth;
