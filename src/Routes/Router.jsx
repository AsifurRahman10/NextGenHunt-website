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
import { UserRouter } from "./UserRoute";
import { ModeratorRouter } from "./ModeratorRoute";
import { Moderator } from "../Component/DashboardNavLink/Moderator";
import { AdminRouter } from "./AdminRouter";
import Blogs from "../Pages/Blogs/Blogs";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import AddBlog from "../Pages/Dashboard/Admin/AddBlog";

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
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blog-details/:id",
        element: (
          <PrivateRoute>
            <BlogDetails />
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
        element: (
          <UserRouter>
            <MyProfile></MyProfile>
          </UserRouter>
        ),
      },
      {
        path: "/dashboard/add-products",
        element: (
          <UserRouter>
            <AddProducts></AddProducts>
          </UserRouter>
        ),
      },
      {
        path: "/dashboard/update-products/:id",
        element: (
          <UserRouter>
            <UpdateProduct></UpdateProduct>
          </UserRouter>
        ),
      },
      {
        path: "/dashboard/my-products",
        element: (
          <UserRouter>
            <MyProducts></MyProducts>
          </UserRouter>
        ),
      },

      // Moderator
      {
        path: "/dashboard/product-review",
        element: (
          <ModeratorRouter>
            <ProductReview></ProductReview>
          </ModeratorRouter>
        ),
      },
      {
        path: "/dashboard/reported-content",
        element: (
          <ModeratorRouter>
            <ReportedContent></ReportedContent>
          </ModeratorRouter>
        ),
      },

      // admin
      {
        path: "/dashboard/statistics-page",
        element: (
          <AdminRouter>
            <StatisticsPage></StatisticsPage>
          </AdminRouter>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRouter>
            <ManageUsers></ManageUsers>
          </AdminRouter>
        ),
      },
      {
        path: "/dashboard/manage-coupons",
        element: (
          <AdminRouter>
            <ManageCoupons></ManageCoupons>
          </AdminRouter>
        ),
      },
      {
        path: "/dashboard/add-blog",
        element: (
          <AdminRouter>
            <AddBlog />
          </AdminRouter>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
