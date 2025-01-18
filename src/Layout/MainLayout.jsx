import { Outlet } from "react-router-dom";
import { Navbar } from "../Component/Navbar/Navbar";
import { Footer } from "../Component/Footer/Footer";

export const MainLayout = () => {
  return (
    <div>
      {/* navbar */}
      <Navbar></Navbar>
      {/* outlet */}
      <Outlet></Outlet>
      {/* footer */}
      <Footer></Footer>
    </div>
  );
};
