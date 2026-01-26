import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getPostsByUser } from "../../backend/post.service";
import TombstonePostCard from "../Posts/TombstonePostCard";

const MyPosts = ({ onStats }) => {
  const { user } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchMyPosts = async () => {
      try {
        setLoadingPosts(true);
        const data = await getPostsByUser(user.uid);
        setPosts(data);

        // ✅ send stats to ProfileCard
        if (onStats) {
          const postsCount = data.length;

          let firstBurialYear = "-";
          if (data.length > 0) {
            const lastPost = data[data.length - 1]; // oldest (because data is desc)
            if (lastPost?.createdAt?.seconds) {
              firstBurialYear = new Date(
                lastPost.createdAt.seconds * 1000
              ).getFullYear();
            }
          }

          onStats({ postsCount, firstBurialYear });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchMyPosts();
  }, [user?.uid, onStats]);

  if (loadingPosts) return <p className="text-gray-400 mt-8">Loading posts...</p>;
  if (posts.length === 0) return <p className="text-gray-400 mt-8">No posts yet 🪦</p>;

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {posts.map((post) => (
        <TombstonePostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default MyPosts;
