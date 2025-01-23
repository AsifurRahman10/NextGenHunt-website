import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../Layout/MainLayout";
import { Home } from "../Pages/Home.jsx/Home";
import { Login } from "../Pages/Login/Login";
import { Register } from "../Pages/Register/Register";
import { ProductDetails } from "../Pages/ProductDetails/ProductDetails";
import { PrivateRoute } from "./PrivateRoute";
import { Products } from "../Pages/Products/Products";
import { DashboardLayout } from "../Layout/DashboardLayout";
import { MyProfile } from "../Pages/Dashboard/User/MyProfile";
import { AddProducts } from "../Pages/Dashboard/User/AddProducts";
import { MyProducts } from "../Pages/Dashboard/User/MyProducts";
import { UpdateProduct } from "../Pages/Dashboard/User/UpdateProduct";
import { ProductReview } from "../Pages/Dashboard/Moderator/ProductReview";
import { ReportedContent } from "../Pages/Dashboard/Moderator/ReportedContent";
import { StatisticsPage } from "../Pages/Dashboard/Admin/StatisticsPage";
import { ManageUsers } from "../Pages/Dashboard/Admin/ManageUsers";
import { ManageCoupons } from "../Pages/Dashboard/Admin/ManageCoupons";
import { Error } from "../Pages/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/product-details/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  // user dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // user
      {
        path: "/dashboard/my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashboard/add-products",
        element: <AddProducts></AddProducts>,
      },
      {
        path: "/dashboard/update-products/:id",
        element: <UpdateProduct></UpdateProduct>,
      },
      {
        path: "/dashboard/my-products",
        element: <MyProducts></MyProducts>,
      },

      // Moderator
      {
        path: "/dashboard/product-review",
        element: <ProductReview></ProductReview>,
      },
      {
        path: "/dashboard/reported-content",
        element: <ReportedContent></ReportedContent>,
      },

      // admin
      {
        path: "/dashboard/statistics-page",
        element: <StatisticsPage></StatisticsPage>,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/manage-coupons",
        element: <ManageCoupons></ManageCoupons>,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
