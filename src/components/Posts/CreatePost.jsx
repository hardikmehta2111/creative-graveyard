import { useState } from "react";
import toast from "react-hot-toast";
// import { auth } from "../backend/FireBaseConfig";
// import { createPost } from "../backend/post.service";
import { auth } from "../../backend/FireBaseConfig";
import { createPost } from "../../backend/post.service";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reasonForFailure: "",
    lessonLearned: "",
    isAnonymous: true,
  });
  let navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Project name is required");
      return;
    }

    try {
      setLoading(true);

      // ✅ Post payload
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        reasonForFailure: formData.reasonForFailure.trim(),
        lessonLearned: formData.lessonLearned.trim(),

        isAnonymous: formData.isAnonymous,
        authorId: user.uid,
      };

      // ✅ Optional: store photoURL only if NOT anonymous
      

      await createPost(payload);

      toast.success("Post buried successfully 🪦");
      navigate('/profile')

      // ✅ reset
      setFormData({
        title: "",
        description: "",
        reasonForFailure: "",
        lessonLearned: "",
        isAnonymous: true,
      });
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 py-12">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-white">
            CARVE A TOMBSTONE
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-400 italic">
            “Every end is a new beginning. Share your story.”
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-3xl">
            <div className="absolute inset-0 blur-3xl opacity-30 bg-indigo-500/10 rounded-full" />

            <div className="relative rounded-t-[110px] rounded-b-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="pt-14 pb-12 px-6 sm:px-10">
                <div className="space-y-7">
                  {/* Title */}
                  <div>
                    <label className="text-[11px] tracking-widest text-gray-400 block mb-2 uppercase">
                      Project Name
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., The Social Network for Cats"
                      className="w-full h-12 rounded-xl bg-black/40 border border-white/10 px-4 text-white text-sm outline-none focus:border-indigo-400/50"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-[11px] tracking-widest text-gray-400 block mb-2 uppercase">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Describe the idea briefly..."
                      className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white text-sm resize-none outline-none focus:border-indigo-400/50"
                    />
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="text-[11px] tracking-widest text-gray-400 block mb-2 uppercase">
                      Reason For Failure
                    </label>
                    <textarea
                      name="reasonForFailure"
                      value={formData.reasonForFailure}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe the ambition, the struggle and the ultimate cause of death..."
                      className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white text-sm resize-none outline-none focus:border-indigo-400/50"
                    />
                  </div>

                  {/* Lessons */}
                  <div>
                    <label className="text-[11px] tracking-widest text-gray-400 block mb-2 uppercase">
                      Lessons Learned
                    </label>
                    <textarea
                      name="lessonLearned"
                      value={formData.lessonLearned}
                      onChange={handleChange}
                      rows={3}
                      placeholder="What wisdom did you gain?"
                      className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white text-sm resize-none outline-none focus:border-indigo-400/50"
                    />
                  </div>

                  {/* Anonymous Toggle */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <p className="text-sm text-white font-medium">
                          Post Anonymously
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Hide your identity on the tombstone.
                        </p>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="isAnonymous"
                          checked={formData.isAnonymous}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-white/10 rounded-full peer peer-checked:bg-indigo-600 transition" />
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6" />
                      </label>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-60"
                  >
                    {loading ? "Burying..." : "⚰️ Bury Post"}
                  </button>
                </div>
              </div>
            </div>

            <div className="h-10" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
