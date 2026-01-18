import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../backend/FireBaseConfig";
import Spinner from "../helper/Spinner";
import { getUserProfile } from "../backend/profile.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ profile state (global cache)
  const [profile, setProfile] = useState(null);

  // ✅ auth loading (initial app load)
  const [loading, setLoading] = useState(true);

  // ✅ profile loading (when fetching profile)
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // ✅ if logged out
      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setProfileLoading(true);
        const data = await getUserProfile(currentUser.uid);
        setProfile(data);
      } catch (err) {
        console.log("Profile fetch error:", err);
        setProfile(null);
      } finally {
        setProfileLoading(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ App enters
  if (loading) {
    return <Spinner fullScreen text="Entering the sanctuary..." />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        setProfile,
        profileLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
