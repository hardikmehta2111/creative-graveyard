import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

import { getUserProfile } from "../../backend/profile.service";
import { getPostsByUser } from "../../backend/post.service";

import ProfileCard from "../profile/ProfileCard";
import Spinner from "../../helper/Spinner";

const Profile = () => {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const [postsCount, setPostsCount] = useState(0);
  const [firstBurialYear, setFirstBurialYear] = useState("-");

  useEffect(() => {
    if (!user?.uid) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        // 🔥 FETCH EVERYTHING IN PARALLEL
        const [profileData, postsData] = await Promise.all([
          getUserProfile(user.uid),
          getPostsByUser(user.uid),
        ]);

        setProfile(profileData);
        setPosts(postsData);

        // 📊 STATS
        setPostsCount(postsData.length);

        if (postsData.length > 0) {
          const oldest = postsData[postsData.length - 1];
          if (oldest?.createdAt?.seconds) {
            setFirstBurialYear(
              new Date(oldest.createdAt.seconds * 1000).getFullYear()
            );
          }
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false); // ✅ SINGLE SPINNER STOPS HERE
      }
    };

    fetchAll();
  }, [user?.uid]);

  if (loading) {
    return <Spinner fullScreen text="Loading profile..." />;
  }

  if (!profile) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <ProfileCard
        profile={profile}
        posts={posts}
        postsCount={postsCount}
        firstBurialYear={firstBurialYear}
      />
    </div>
  );
};

export default Profile;