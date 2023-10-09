import { Outlet } from "react-router-dom";
import Footer from "../Public/Footer";
import HeaderNav from "../Public/Navbar";
import ProfileMenu from "./ProfileMenu";

const ProfileLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <HeaderNav />
      </header>
      <main className="grow flex flex-col bg-base-300 min-h-[85vh]">
        <ProfileMenu />
        <div className="sm:px-10 py-6 grow px-0">
          <Outlet />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ProfileLayout;
