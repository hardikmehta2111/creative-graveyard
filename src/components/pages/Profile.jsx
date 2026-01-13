import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getUserProfile } from "../../backend/profile.service.js";
// import ProfileCard from "./ProfileCard";
// import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";
import ProfileCard from "../profile/ProfileCard.jsx";
import Spinner from "../../helper/Spinner.jsx";

const Profile = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
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
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Spinner text="Summoning memories..." />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <ProfileCard profile={profile} />
    </div>
  );
};

export default Profile;
