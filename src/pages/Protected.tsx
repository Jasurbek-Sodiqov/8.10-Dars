import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";

const Protected = ({ children }: { children: any }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.authStateReady().finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <span>We are checking authenfication</span>;
  } else {
    if (auth.currentUser) {
      return children;
    }
  }
  return <Navigate to={"/login"}></Navigate>;
};

export default Protected;
