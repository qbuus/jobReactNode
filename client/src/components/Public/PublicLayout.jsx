import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HeaderNav from "./Navbar";
import { useEffect } from "react";
import { setUserData } from "../../Redux/Auth/authSlice";
import { useDispatch } from "react-redux";
import { useRefreshMutation } from "../../Redux/Auth/authApiSlice";

const PublicLayout = () => {
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    async function checkIfLoggedIn() {
      await refresh();
    }
    checkIfLoggedIn();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0">
          <HeaderNav />
        </header>
        <main className="grow flex bg-base-300 min-h-[85vh]">
          <Outlet />
        </main>
        <footer className="sticky">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default PublicLayout;
