import { memo } from "react";
import { NavLink } from "react-router-dom";

const ProfileCard = ({ profile }) => {
  const initials = profile.displayName
    ?.split(" ")
    .map(w => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl px-8 py-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-black/40 border border-white/15 flex items-center justify-center text-white font-medium">
            {initials || "CG"}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-white text-lg font-semibold">
              {profile.displayName || "Anonymous Ghost"}
            </h1>
            <p className="text-gray-400 text-sm italic mt-1">
              {profile.bio || "No epitaph written yet."}
            </p>
          </div>
        </div>

        <NavLink
          to="/edit-profile"
          className="text-xs border border-white/20 rounded-full px-4 py-1.5 text-gray-300 hover:text-white transition"
        >
          Edit Profile
        </NavLink>
      </div>
    </div>
  );
};

export default memo(ProfileCard);
