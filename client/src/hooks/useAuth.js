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
    const { username, role, id } = decoded.UserInfo;

    isSeeker = role.includes("Seeker");
    isRecruiter = role.includes("Recruiter");

    if (isSeeker) status = "Seeker";
    if (isRecruiter) status = "Recruiter";

    userID = id;

    return {
      username,
      role,
      status,
      isSeeker,
      isRecruiter,
      userID,
    };
  }

  return {
    username: "",
    role: "",
    isRecruiter,
    isSeeker,
    status,
    userID,
  };
};
export default useAuth;
