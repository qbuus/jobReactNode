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
import AuthRequired from "./components/Auth/AuthRequired.jsx";
import RememberLogin from "./components/Auth/RememberLogin.jsx";

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
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
          <Route element={<RememberLogin />}>
            <Route element={<AuthRequired />}>
              <Route path="my-profile">
                <Route index element={<Profile />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
