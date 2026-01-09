import { useEffect, useState } from "react";
import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../backend/auth.service";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getCurrentUser((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    user,
    loading,
    signup: signupUser,
    login: loginUser,
    logout: logoutUser,
  };
};

export default useAuth;
