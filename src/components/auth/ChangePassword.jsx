import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import { auth } from "../../backend/FireBaseConfig";
import Spinner from "../../helper/Spinner";

const ChangePassword = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // 🔐 Re-authenticate user
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      // 🔥 Update password
      await updatePassword(user, newPassword);

      toast.success("Password updated successfully");
      navigate("/profile");
    } catch (err) {
      toast.error("Invalid Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-6">
      {loading && <Spinner fullScreen text="Updating password..." />}

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <h1 className="text-xl font-semibold text-white mb-6">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              CURRENT PASSWORD
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white text-sm"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              NEW PASSWORD
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white text-sm"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              CONFIRM NEW PASSWORD
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition"
            >
              Update Password
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

export default ChangePassword;
