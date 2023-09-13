import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HeaderNav from "./Navbar";

const PublicLayout = () => {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <header>
          <HeaderNav />
        </header>
        <main className="grow flex bg-base-300">
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default PublicLayout;
