import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Chats from "./pages/Chats";
import Login from "./pages/Login";
import ChatRoom from "./pages/ChatRoom";
import "./index.css";
import { CssBaseline } from "@mui/material";
import Protected from "./pages/Protected";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Chats />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/chat-room/:id",
    element: <ChatRoom />,
  },
]);

const App = () => {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
