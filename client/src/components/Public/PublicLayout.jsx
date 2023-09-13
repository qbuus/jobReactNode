import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HeaderNav from "./Navbar";

const PublicLayout = () => {
  return (
    <>
      <header>
        <HeaderNav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default PublicLayout;
