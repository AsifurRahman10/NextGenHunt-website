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
    <div className="bg-white dark:bg-[#1C1C1C]">
      {/* navbar */}
      <Navbar></Navbar>
      {/* outlet */}
      <section className="pt-[65px]">
        <Outlet></Outlet>
      </section>
      {/* footer */}
      <Footer></Footer>
    </div>
  );
};
