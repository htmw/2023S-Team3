import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import NoPage from "../pages/NoPage";
import App from "../App";
import CreateRoom from "../pages/CreateRoom";
import Home from "../pages/Home";
import JoinRoom from "../pages/JoinRoom";
import MarkAttendance from "../components/MarkAttendance";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoPage></NoPage>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "create",
        element: <CreateRoom />,
      },
      {
        path: "attendance",
        element: <MarkAttendance />,
      },
      {
        path: "room/:roomName",
        element: <JoinRoom />,
      },
    ],
  },
  {
    path: "/login",
    errorElement: <NoPage></NoPage>,
    element: <Login></Login>,
  },
]);
