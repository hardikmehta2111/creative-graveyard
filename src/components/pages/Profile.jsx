import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthContext } from "../../context/AuthContext";
import { getUserProfile } from "../../backend/profile.service";

import ProfileCard from "../profile/ProfileCard";
import Spinner from "../../helper/Spinner";
import MyPosts from "../profile/MyPosts";
// import MyPosts from "./MyPosts";

const Profile = () => {
  const { user } = useAuthContext();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Stats state
  const [postsCount, setPostsCount] = useState(0);
  const [firstBurialYear, setFirstBurialYear] = useState("-");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;

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
  }, [user?.uid]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Spinner text="Loading profile..." />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* ✅ ProfileCard now gets real stats */}
      <ProfileCard
        profile={profile}
        postsCount={postsCount}
        firstBurialYear={firstBurialYear}
      />

      {/* ✅ Posts below profile card */}
      <MyPosts
        onStats={({ postsCount, firstBurialYear }) => {
          setPostsCount(postsCount);
          setFirstBurialYear(firstBurialYear);
        }}
      />

      <Outlet context={{ profile, setProfile }} />
    </div>
  );
};

export default Profile;
