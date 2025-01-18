import { Outlet } from "react-router-dom";
import { Navbar } from "../Component/Navbar/Navbar";

export const MainLayout = () => {
  return (
    <div>
      {/* navbar */}
      <Navbar></Navbar>
      {/* outlet */}
      <Outlet></Outlet>
    </div>
  );
};
