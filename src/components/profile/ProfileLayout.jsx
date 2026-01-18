import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import { getUserProfile } from "../../backend/profile.service";
import { useAuthContext } from "../../context/AuthContext";
import Spinner from "../../helper/Spinner";

const ProfileLayout = () => {
  const { user } = useAuthContext();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile(user.uid);
        setProfile(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.uid]); // ✅ only depends on uid

  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      {/* SIDEBAR */}
      <ProfileSidebar />

      {/* CONTENT */}
      <main className="flex-1 bg-gradient-to-b from-black via-[#020617] to-black p-6">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Spinner text="Loading profile..." />
          </div>
        ) : (
          <Outlet context={{ profile, setProfile }} />
        )}
      </main>
    </div>
  );
};

export default ProfileLayout;
