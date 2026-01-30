import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth } from "../../backend/FireBaseConfig";
import { getPostById, updatePost } from "../../backend/post.service";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../helper/Spinner";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reasonForFailure: "",
    lessonLearned: "",

  });

  // 🔥 Load existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(postId);

        if (!post) {
          toast.error("Post not found");
          navigate("/");
          return;
        }

        // 🔐 owner check
        if (post.authorId !== auth.currentUser?.uid) {
          toast.error("Unauthorized");
          navigate("/");
          return;
        }

        setFormData({
          title: post.title || "",
          description: post.description || "",
          reasonForFailure: post.reasonForFailure || "",
          lessonLearned: post.lessonLearned || "",
          isAnonymous: post.isAnonymous ?? true,
        });
      } catch (err) {
        toast.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Project name is required");
      return;
    }

    try {
      setSaving(true);

      await updatePost(postId, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        reasonForFailure: formData.reasonForFailure.trim(),
        lessonLearned: formData.lessonLearned.trim(),
        
      });

      toast.success("Tombstone updated 🪦");
      navigate(`/post/${postId}`);
    } catch (err) {
      toast.error("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Spinner fullScreen text="Exhuming tombstone..." />;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 py-12">
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            EDIT TOMBSTONE
          </h1>
          <p className="mt-2 text-sm text-gray-400 italic">
            “Even the dead can be rewritten.”
          </p>
        </div>

        {/* TOMBSTONE FORM (same as CreatePost) */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-3xl">
            <div className="relative rounded-t-[110px] rounded-b-3xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden">
              <div className="pt-14 pb-12 px-6 sm:px-10 space-y-7">

                {/* Title */}
                <div>
                  <label className="text-[11px] tracking-widest text-gray-400 block mb-2 uppercase">
                    Project Name
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full h-12 rounded-xl bg-black/40 border border-white/10 px-4 text-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-[11px] tracking-widest text-gray-400 block mb-2 uppercase">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white resize-none"
                  />
                </div>

                {/* Reason */}
                <div>
                  <label className="text-[11px] tracking-widest text-gray-400 block mb-2 uppercase">
                    Reason For Failure
                  </label>
                  <textarea
                    name="reasonForFailure"
                    rows={4}
                    value={formData.reasonForFailure}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white resize-none"
                  />
                </div>

                {/* Lessons */}
                <div>
                  <label className="text-[11px] tracking-widest text-gray-400 block mb-2 uppercase">
                    Lessons Learned
                  </label>
                  <textarea
                    name="lessonLearned"
                    rows={3}
                    value={formData.lessonLearned}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white resize-none"
                  />
                </div>

               

                {/* Submit */}
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                >
                  {saving ? "Updating..." : "🪦 Update Tombstone"}
                </button>

              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;