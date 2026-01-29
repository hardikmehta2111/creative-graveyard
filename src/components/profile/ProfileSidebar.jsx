import { HiX } from "react-icons/hi";
import ProfileSidebarContent from "./ProfileSidebarContent";

const ProfileSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* OVERLAY (mobile only) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50 top-0 left-0
          h-[100dvh] md:h-[calc(100vh-80px)] w-64
          bg-black/90 border-r border-white/10 p-4
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* MOBILE CLOSE */}
        <button
          onClick={onClose}
          className="md:hidden mb-4 text-gray-400 hover:text-white"
        >
          <HiX size={22} />
        </button>

        <ProfileSidebarContent onNavigate={onClose} />
      </aside>
    </>
  );
};

export default ProfileSidebar;