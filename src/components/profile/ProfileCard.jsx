import { memo } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const ProfileCard = ({ profile, onEdit, onEditPhoto }) => {
  const initials = profile.displayName
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-full bg-gradient-to-r from-[#0b1026] via-[#111827] to-[#0b1026] border border-white/10 rounded-2xl px-8 py-6">

      {/* Top Section */}
      <div className="flex justify-between items-start gap-6">

        {/* Avatar + Info */}
        <div className="flex gap-5 items-center">

          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-black/40 border border-white/20 overflow-hidden flex items-center justify-center text-white text-xl font-semibold">
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
              <NavLink to={'edit-photo'}> <HiOutlinePencil className="text-white text-sm" /></NavLink>
            </button>
          </div>

          {/* Name & Bio */}
          <div>
            <h1 className="text-white text-xl font-semibold tracking-wide">
              @{profile.username || "anonymous"}
            </h1>
            <p className="text-gray-400 text-sm italic mt-1 max-w-md">
              {profile.bio || "Building things that break, so I don’t have to."}
            </p>
          </div>
        </div>

        {/* EDIT PROFILE BUTTON */}
        <NavLink to={'edit-info'}
          onClick={onEdit}
          className="h-fit text-xs border border-white/20 rounded-md px-4 py-2 text-gray-300 hover:text-white hover:border-white transition"
        >
          Edit Profile
        </NavLink>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-white/10" />

      {/* Stats */}
      <div className="grid grid-cols-3 text-center">
        <div>
          <p className="text-white text-lg font-semibold">
            {profile.failuresCount ?? 12}
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Failures Laid to Rest
          </p>
        </div>

        <div className="border-x border-white/10">
          <p className="text-white text-lg font-semibold">
            {profile.lessonsCount ?? 45}
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Lessons Shared
          </p>
        </div>

        <div>
          <p className="text-white text-lg font-semibold">
            {profile.firstBurialYear ?? 2018}
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            First Burial
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileCard);
