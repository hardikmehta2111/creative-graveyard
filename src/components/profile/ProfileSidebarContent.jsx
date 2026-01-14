import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../backend/FireBaseConfig";
import { HiOutlineCamera, HiOutlineLockClosed } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
   ${
     isActive
       ? "bg-white/10 text-white border-l-4 border-white"
       : "text-gray-400 hover:bg-white/5 hover:text-white"
   }`;

const ProfileSidebarContent = ({ onNavigate }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
      navigate("/login");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* TOP */}
      <div className="space-y-2">
        <p className="px-4 text-xs text-gray-500 uppercase tracking-wide mb-2">
          Grave Controls
        </p>

        <NavLink to="/profile" end className={linkClass} onClick={onNavigate}>
          <span>🪦</span>
          <span>My Grave</span>
        </NavLink>

        <NavLink to="/profile/edit" className={linkClass} onClick={onNavigate}>
          <FaEdit />
          <span>Edit Info</span>
        </NavLink>

        <NavLink to="/profile/edit-photo" className={linkClass} onClick={onNavigate}>
          <HiOutlineCamera />
          <span>Change Profile Photo</span>
        </NavLink>

        <NavLink
          to="/profile/change-password"
          className={linkClass}
          onClick={onNavigate}
        >
          <HiOutlineLockClosed />
          <span>Change Password</span>
        </NavLink>
      </div>

      {/* DANGER */}
      <div className="pt-4 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                     text-sm font-medium text-red-400
                     hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          🚪 <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebarContent;
