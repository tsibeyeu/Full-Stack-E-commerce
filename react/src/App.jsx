import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import User from "./component/User";
import NotFound from "./component/NotFound";
import DefaultLayout from "./component/DefaultLayout";
import GuestLayout from "./component/GuestLayout";
import Dashboard from "./component/Dashboard";
const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/users",
                element: <User />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            { path: "/signup", element: <Signup /> },
           
        ],
    },
    {
      path: "*",
      element: <NotFound />,
  },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
