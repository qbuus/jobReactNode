import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/Public/PublicLayout.jsx";
import Login from "./components/Auth/Login";
import PublicMain from "./components/Public/PublicMain";
import RegisterNewUser from "./components/Auth/RegisterNewUser";
import SignLayout from "./components/Auth/SignLayout";
import RequireAuth from "./components/Auth/RequireAuth";
import Profile from "./pages/Profile";
import { UserRoles } from "./config/UserRole";
import Testprofile from "./components/testprofile.jsx";
import Layout from "./components/Layout.jsx";
import { useEffect } from "react";
import { themeChange } from "theme-change";

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
            <Route path="test" element={<Testprofile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
