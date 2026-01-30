import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Spinner from "../../helper/Spinner";
import { useAuthContext } from "../../context/AuthContext";
import {
  getPostById,
  checkIfLiked,
  toggleFlower,
} from "../../backend/post.service";
import { getUserProfile } from "../../backend/profile.service";

import { useNavigate } from "react-router-dom";
import { deletePost } from "../../backend/post.service";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

const DEFAULT_ANON_PHOTO =
  "https://cdn.pixabay.com/photo/2023/10/03/10/49/anonymous-8291223_1280.png";

const CONSTANT_ANON_USERNAME = "@anonymous_soul";

const PostDetails = () => {
  const { postId } = useParams();
  const { user } = useAuthContext();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);


  // 🌸 likes
  const [flowers, setFlowers] = useState(0);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);

  // 💬 Comments UI only for now
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    { id: 1, name: "Grave Keeper", text: "RIP 🪦 but solid lesson." },
    { id: 2, name: "Midnight Soul", text: "This was inspiring 🔥" },
  ]);

  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      await deletePost(postId);
      navigate("/"); // after delete
    } catch (err) {
      console.log(err);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };


  useEffect(() => {
    const fetchPostAndAuthor = async () => {
      try {
        setLoading(true);

        // ✅ Fetch post
        const postData = await getPostById(postId);
        setPost(postData);

        if (!postData) return;

        // ✅ Load flowers count
        setFlowers(postData?.flowersCount || 0);

        // ✅ Check user already liked?
        if (user?.uid) {
          const alreadyLiked = await checkIfLiked(postId, user.uid);
          setLiked(alreadyLiked);
        }

        // ✅ Fetch author only if NOT anonymous
        if (!postData.isAnonymous && postData.authorId) {
          const authorData = await getUserProfile(postData.authorId);
          setAuthor(authorData);
        } else {
          setAuthor(null);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndAuthor();
  }, [postId, user?.uid]);

  // ✅ Like button handler (Firestore)
  const handleFlowerToggle = async () => {
    if (!user?.uid) return;

    try {
      setLiking(true);
      const res = await toggleFlower(postId, user.uid);

      setLiked(res.liked);
      setFlowers(res.flowersCount);
    } catch (err) {
      console.log(err);
    } finally {
      setLiking(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Spinner text="Summoning the tomb..." />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-20 text-center text-gray-400">Post not found ❌</div>
    );
  }

  const isOwner = user?.uid === post.authorId;

  const createdDate = post?.createdAt?.seconds
    ? new Date(post.createdAt.seconds * 1000).toDateString()
    : "Just now";

  // ✅ Anonymous logic
  const displayPhoto = post.isAnonymous
    ? DEFAULT_ANON_PHOTO
    : author?.photoURL || DEFAULT_ANON_PHOTO;

  const displayUsername = post.isAnonymous
    ? CONSTANT_ANON_USERNAME
    : `@${author?.username || "unknown"}`;

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      name: user?.displayName || "Unknown User",
      text: commentText.trim(),
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-black via-[#020617] to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ✅ LEFT SECTION - Tombstone user details */}
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-6">
            <NavLink
              to="/explore"
              className="text-gray-400 hover:text-white text-sm"
            >
              ← Back to Cemetery
            </NavLink>

            <div className="mt-6 overflow-hidden rounded-t-[160px] rounded-b-2xl bg-gradient-to-b from-[#0b1026] via-[#111827] to-black border border-white/10 shadow-xl">
              <div className="h-[190px] flex flex-col items-center justify-center relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-white/20 bg-black/30">
                  <img
                    src={displayPhoto}
                    alt="author"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="mt-4 text-sm font-semibold text-gray-200">
                  {displayUsername}
                </p>

                <p className="mt-1 text-xs text-gray-400 italic">
                  Resting since {createdDate}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2f6f3a]" />
              </div>

              <div className="p-6">
                <p className="text-xs text-gray-500 tracking-widest uppercase">
                  Epitaph Details
                </p>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <p className="text-gray-500">Visibility</p>
                    <p className="text-gray-300">
                      {post.isAnonymous ? "Anonymous" : "Public"}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-gray-500">Flowers</p>
                    <p className="text-gray-300">{flowers}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-gray-500">Condolences</p>
                    <p className="text-gray-300">{comments.length}</p>
                  </div>
                </div>

                {/* Owner actions */}
                {isOwner && (
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button 
                    onClick={() => navigate(`/post/${postId}/edit`)}
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-xl py-2 text-sm transition">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        console.log("Delete clicked");
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-600 hover:bg-red-700 rounded-xl py-2 text-sm transition"
                    >
                      Delete
                    </button>


                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ CENTER SECTION - Full Post */}
        <div className="lg:col-span-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
            <h1 className="text-3xl font-bold leading-tight">
              {post.title || "Untitled"}
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              {displayUsername} • {createdDate}
            </p>

            <p className="mt-6 text-gray-300 leading-relaxed">
              {post.description || "No description..."}
            </p>

            <div className="mt-8 bg-black/30 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-100">
                🕯 The Downfall
              </h2>
              <p className="mt-3 text-gray-300 leading-relaxed">
                {post.reasonForFailure || "Not written..."}
              </p>
            </div>

            <div className="mt-6 bg-black/30 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-100">
                ⚰️ Post-Mortem Lessons
              </h2>
              <p className="mt-3 text-gray-300 leading-relaxed">
                {post.lessonLearned || "Not written..."}
              </p>
            </div>

            {/* ✅ Flower button (Firestore Like System) */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleFlowerToggle}
                disabled={liking}
                className={`px-6 py-3 rounded-xl transition text-sm font-semibold disabled:opacity-60
                    ${liked
                    ? "bg-pink-600 hover:bg-pink-700"
                    : "bg-purple-600 hover:bg-purple-700"
                  }`}
              >
                {liking
                  ? "Burying flowers..."
                  : liked
                    ? `💐 Flower Left (${flowers})`
                    : `🌸 Leave a Flower (${flowers})`}
              </button>
            </div>
          </div>
        </div>

        {/* ✅ RIGHT SECTION - Comments */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold">Condolences</h2>

            <div className="mt-4 flex gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a condolence..."
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-white/20"
              />
              <button
                onClick={handleAddComment}
                className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-4 text-sm transition"
              >
                Post
              </button>
            </div>

            <div className="mt-6 space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-black/30 border border-white/10 rounded-xl p-4"
                >
                  <p className="text-sm text-gray-200 font-semibold">{c.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{c.text}</p>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2 text-sm text-gray-300 transition">
              View older comments
            </button>
          </div>
        </div>
      </div>
      <DeleteConfirmModal
  open={showDeleteModal}
  loading={deleting}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={handleConfirmDelete}
/>


    </div>
  );
};

export default PostDetails;
