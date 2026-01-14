import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import Spinner from "../../helper/Spinner";
import { updateUserProfile } from "../../backend/profile.service";
import { useAuthContext } from "../../context/AuthContext";

const EditPhoto = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // 🔥 from Profile.jsx
  const { profile, setProfile } = useOutletContext();

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(profile?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!profile) return null;

  // SAME LOGIC AS WORKING VERSION
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!photoFile) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      setLoading(true);

      // 🔥 EXACT WORKING CLOUDINARY LOGIC
      const formData = new FormData();
      formData.append("file", photoFile);
      formData.append("upload_preset", "users_profile"); // 👈 SAME AS WORKING
      formData.append("cloud_name", "dyurt1jtk");

      const imageData = await axios.post(
        "https://api.cloudinary.com/v1_1/dyurt1jtk/image/upload",
        formData,
        {
          onUploadProgress: (event) => {
            if (event.total) {
              setProgress(Math.round((event.loaded * 100) / event.total));
            }
          },
        }
      );

      const photoURL = imageData.data.secure_url;

      // 🔥 Update Firestore
      await updateUserProfile(user.uid, { photoURL });

      // 🔥 Update UI instantly (NO reload)
      setProfile((prev) => ({
        ...prev,
        photoURL,
      }));

      toast.success("Profile photo updated");
      navigate("/profile");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err);
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {loading && <Spinner fullScreen text={`Uploading ${progress}%`} />}

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <h1 className="text-xl font-semibold text-white mb-6">
          Update Profile Photo
        </h1>

        {/* Preview */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-black/40 border border-white/20 overflow-hidden">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No photo
              </div>
            )}
          </div>

          <label className="cursor-pointer text-sm text-gray-300 hover:text-white">
            Choose Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-8">
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition"
          >
            Save Photo
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-2 rounded-lg border border-white/20 text-gray-300 hover:text-white text-sm transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPhoto;
