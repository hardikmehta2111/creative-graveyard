import { memo } from "react";
import { HiOutlinePencil, HiDotsHorizontal } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const ProfileCard = ({ profile, onEdit, onEditPhoto, onOpenSidebar }) => {
  const initials = profile.displayName
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-full bg-gradient-to-r from-[#0b1026] via-[#111827] to-[#0b1026] border border-white/10 rounded-2xl px-5 py-5 md:px-8 md:py-6">

      {/* Top Section */}
      <div className="flex justify-between items-start gap-4 md:gap-6">

        {/* Avatar + Info */}
        <div className="flex gap-4 md:gap-5 items-center">

          {/* Avatar */}
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 border border-white/20 overflow-hidden flex items-center justify-center text-white text-xl font-semibold">
              {profile.photoURL ? (
                <img
                  src={profile.photoURL}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                initials || "CG"
              )}
            </div>

            {/* EDIT PHOTO (PENCIL ICON) */}
            <button
              onClick={onEditPhoto}
              title="Edit profile photo"
              className="absolute -bottom-1 -right-1 bg-black/80 border border-white/20 p-1.5 rounded-full hover:bg-black transition"
            >
              <NavLink to={'edit-photo'}> <HiOutlinePencil className="text-white text-xs md:text-sm" /></NavLink>
            </button>
          </div>

          {/* Name & Bio */}
          <div className="overflow-hidden">
            <h1 className="text-white text-lg md:text-xl font-semibold tracking-wide truncate">
              @{profile.username || "anonymous"}
            </h1>
            <p className="text-gray-400 text-xs md:text-sm italic mt-1 max-w-md break-words md:truncate">
              {profile.bio || "Building things that break, so I don’t have to."}
            </p>
          </div>
        </div>

        {/* MENU BUTTON (Mobile) */}
        <button
          onClick={onOpenSidebar}
          className="md:hidden p-2 text-white/70 hover:text-white transition bg-white/5 rounded-lg border border-white/10 shrink-0"
        >
          <HiDotsHorizontal size={20} />
        </button>

      </div>

      {/* Divider */}
      <div className="my-5 md:my-6 border-t border-white/10" />

      {/* Stats */}
      <div className="grid grid-cols-3 text-center divide-x divide-white/10">
        <div className="px-1">
          <p className="text-white text-base md:text-lg font-semibold">
            {profile.failuresCount ?? 12}
          </p>
          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wide truncate">
            Failures
          </p>
        </div>

        <div className="px-1">
          <p className="text-white text-base md:text-lg font-semibold">
            {profile.lessonsCount ?? 45}
          </p>
          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wide truncate">
            Lessons
          </p>
        </div>

        <div className="px-1">
          <p className="text-white text-base md:text-lg font-semibold">
            {profile.firstBurialYear ?? 2018}
          </p>
          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wide truncate">
            Using
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileCard);
