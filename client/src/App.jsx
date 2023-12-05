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
import ResetPassword from "./components/Auth/ResetPassword.jsx";
import Applications from "./pages/Applications.jsx";
import Offers from "./pages/Offers.jsx";
import OffersLayout from "./components/Offers/OffersLayout.jsx";
import NewOffer from "./components/Offers/NewOffer.jsx";
import MyOffers from "./components/Offers/MyOffers.jsx";
import PrivateSingleOfferPage from "./components/Offers/SingleOfferPage.jsx";
import OfferFilter from "./pages/OfferFilter.jsx";
import SingleOffer from "./components/Public/SingleOffer.jsx";

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
            <Route
              path="/all-offers"
              element={<OfferFilter />}
            />
            <Route
              path="/offer/:id"
              element={<SingleOffer />}
            />
          </Route>

          <Route element={<ProfileLayout />}>
            <Route element={<RememberLogin />}>
              <Route
                index
                path="/my-profile"
                element={<Profile />}
              />
              <Route
                path="/my-applications"
                element={<Applications />}
              />
              <Route
                path="/my-offers"
                element={<OffersLayout />}
              >
                <Route index element={<Offers />} />
                <Route
                  path="create-new-offer"
                  element={<NewOffer />}
                />
                <Route path="offers" element={<MyOffers />} />
                <Route
                  path="offers/:id"
                  element={<PrivateSingleOfferPage />}
                />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
