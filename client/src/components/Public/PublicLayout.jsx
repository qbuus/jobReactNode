import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HeaderNav from "./Navbar";

const PublicLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0">
          <HeaderNav />
        </header>
        <main className="grow flex bg-base-300 min-h-[85vh]">
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
