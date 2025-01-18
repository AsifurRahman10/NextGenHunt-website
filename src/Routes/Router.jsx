import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../Layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
  },
]);
