import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HeaderNav from "./Navbar";

const PublicLayout = () => {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <header className="grow-0">
          <HeaderNav />
        </header>
        <main className="grow py-1">
          <Outlet />
        </main>
        <footer className="grow-0">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default PublicLayout;
