import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Chats from "./pages/Chats";
import Login from "./pages/Login";
import ChatRoom from "./pages/ChatRoom";
import "./index.css";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Chats />,
  },
  {
    path: "/login",
    element: <Login />,
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
