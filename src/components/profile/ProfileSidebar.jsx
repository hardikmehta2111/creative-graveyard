import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import ProfileSidebarContent from "./ProfileSidebarContent";

const ProfileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-24 left-4 z-40
        bg-black/70 text-white p-2 rounded-lg
        border border-white/10"
      >
        <HiMenu size={22} />
      </button>

      {/* OVERLAY (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50 top-0 left-0
          h-[calc(100vh-80px)] w-64
          bg-black/90 border-r border-white/10 p-4
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* MOBILE CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden mb-4 text-gray-400 hover:text-white"
        >
          <HiX size={22} />
        </button>

        <ProfileSidebarContent onNavigate={() => setOpen(false)} />
      </aside>
    </>
  );
};

export default ProfileSidebar;
