import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import { getUserProfile } from "../../backend/profile.service";
import { useAuthContext } from "../../context/AuthContext";
import Spinner from "../../helper/Spinner";

const ProfileLayout = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(user.uid);
        setProfile(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.uid]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Spinner text="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      {/* SIDEBAR */}
      <ProfileSidebar />

      {/* CONTENT */}
      <main className="flex-1 bg-gradient-to-b from-black via-[#020617] to-black p-6">
        <Outlet context={{ profile, setProfile }} />

      </main>
    </div>
  );
};

export default ProfileLayout;


<Outlet context={{ profile, setProfile }} />