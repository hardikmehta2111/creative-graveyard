import { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthContext } from "../../context/AuthContext";
import { getUserProfile } from "../../backend/profile.service";
import Spinner from "../../helper/Spinner";

const ProfileLayout = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const data = await getUserProfile(user.uid);
      setProfile(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Spinner text="Loading profile..." />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-20 text-center text-gray-400">
        Profile not found
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 py-10">
      {/* 🔥 SINGLE SOURCE OF TRUTH */}
      <Outlet context={{ profile, refreshProfile: fetchProfile }} />
    </div>
  );
};

export default ProfileLayout;
