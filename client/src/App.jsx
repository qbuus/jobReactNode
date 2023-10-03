import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/Public/PublicLayout.jsx";
import Login from "./components/Auth/Login";
import PublicMain from "./components/Public/PublicMain";
import RegisterNewUser from "./components/Auth/RegisterNewUser";
import SignLayout from "./components/Auth/SignLayout";
import Profile from "./pages/Profile";
import Layout from "./components/Layout.jsx";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import RememberLogin from "./components/Auth/RememberLogin.jsx";
import ProfileLayout from "./components/Profile/ProfileLayout.jsx";
import MyApplications from "./components/Profile/MyApplications.jsx";
import ResetPassword from "./components/Auth/ResetPassword.jsx";

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="reset-password"
            element={<ResetPassword />}
          />
          {/* To auth layout */}
          <Route element={<SignLayout />}>
            <Route path="login" element={<Login />} />
            <Route
              path="register"
              element={<RegisterNewUser />}
            />
          </Route>

          <Route element={<PublicLayout />}>
            <Route index element={<PublicMain />} />
          </Route>

          <Route element={<ProfileLayout />}>
            <Route element={<RememberLogin />}>
              <Route
                index
                path="my-profile"
                element={<Profile />}
              />
              <Route
                path="my-applications"
                element={<MyApplications />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
