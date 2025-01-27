import { Outlet } from "react-router-dom";
import { Navbar } from "../Component/Navbar/Navbar";
import { Footer } from "../Component/Footer/Footer";
import { useAuth } from "../Hooks/useAuth";
import { Loading } from "../Component/Share/Loading";

export const MainLayout = () => {
  const { loading } = useAuth();
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-white">
      {/* navbar */}
      <Navbar></Navbar>
      {/* outlet */}
      <Outlet></Outlet>
      {/* footer */}
      <Footer></Footer>
    </div>
  );
};
