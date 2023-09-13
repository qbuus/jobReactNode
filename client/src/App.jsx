import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PublicLayout from "./components/Public/PublicLayout.jsx";
import Login from "./components/Auth/Login";
import PublicMain from "./components/Public/PublicMain";
import Welcome from "./components/Public/Welcome";
import Test from "./components/test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="main" element={<PublicLayout />}>
            <Route index element={<PublicMain />} />

            {/* private  <Route element={<Test />}></Route> */}
          </Route>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
