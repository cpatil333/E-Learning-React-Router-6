import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage";
import { Home } from "./pages/Home";
import { getUserData } from "./API/getUserData";
import { CreateUser, userData } from "./pages/CreateUser";
import { AppLayout } from "./components/layout/AppLayout";
import { Login, userLogin } from "./pages/Login";
import { Course } from "./pages/Course";
import { getCourseData } from "./API/getCourseData";
import { EditUser } from "./pages/EditUser";
import { getUser } from "./API/getUser";
import { courseData, CreateCourse } from "./pages/CreateCourse";
import { EditCourse } from "./pages/EditCourse";
import { getCourse } from "./API/getCourse";
import { Users } from "./pages/Users";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          // element: <Home />,
          element: <Users />,
          loader: getUserData,
        },
        {
          path: "/create-user",
          element: <CreateUser />,
          action: userData,
        },
        {
          path: "/update-user/:id",
          element: <EditUser />,
          loader: getUser,
        },
        {
          path: "/course-list",
          element: <Course />,
          loader: getCourseData,
        },
        {
          path: "/create-course",
          element: <CreateCourse />,
          action: courseData,
        },
        {
          path: "/update-course/:id",
          element: <EditCourse />,
          loader: getCourse,
        },
        {
          path: "/login",
          element: <Login />,
          action: userLogin,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
