import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PublicLayout from "./components/Public/PublicLayout.jsx";
import Login from "./components/Auth/Login";
import PublicMain from "./components/Public/PublicMain";
import RegisterNewUser from "./components/Auth/RegisterNewUser";
import SignLayout from "./components/Auth/SignLayout";
import { themeChange } from "theme-change";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
