import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";

import Spinner from "../../helper/Spinner";
import { updateUserProfile } from "../../backend/profile.service";
import { useAuthContext } from "../../context/AuthContext";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { profile, setProfile } = useOutletContext();


  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 PREFILL FORM
  useEffect(() => {
    if (!profile) return;

    setFormData({
      displayName: profile.displayName ?? "",
      bio: profile.bio ?? "",
    });
  }, [profile]);

  // safety guard
  if (!profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner text="Loading profile..." />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUserProfile(user.uid, {
        displayName: formData.displayName,
        bio: formData.bio,
      });

      setProfile((prev) => ({
        ...prev,
        displayName: formData.displayName,
        bio: formData.bio,
      }));

      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {loading && <Spinner fullScreen text="Updating profile..." />}

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <h1 className="text-xl font-semibold text-white mb-6">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username (LOCKED) */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              USERNAME (LOCKED)
            </label>
            <input
              type="text"
              value={`@${profile.username}`}
              disabled
              className="w-full h-11 rounded-lg bg-black/30 border border-white/10 px-4 text-gray-400 text-sm"
            />
          </div>

          {/* Display Name */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              FULL NAME
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white text-sm"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              BIO
            </label>
            <textarea
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white text-sm resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-2 rounded-lg border border-white/20 text-gray-300 hover:text-white text-sm transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfile;
