import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthContext } from "../../context/AuthContext";
import { getUserProfile } from "../../backend/profile.service";

import ProfileCard from "../profile/ProfileCard";
import Spinner from "../../helper/Spinner";

const Profile = () => {
  const { user } = useAuthContext();
  const { openSidebar } = useOutletContext();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH PROFILE ONCE
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const data = await getUserProfile(user.uid);
        setProfile(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Spinner text="Loading profile..." />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-6 md:space-y-8">

      {/* 🔥 ALWAYS VISIBLE */}
      <ProfileCard profile={profile} onOpenSidebar={openSidebar} />

      {/* 🔥 FEATURE AREA */}
      <Outlet context={{ profile, setProfile }} />
    </div>
  );
};

export default Profile;
