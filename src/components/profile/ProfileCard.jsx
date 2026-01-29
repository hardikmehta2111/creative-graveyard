import { memo } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import TombstonePostCard from "../Posts/TombstonePostCard";

const ProfileCard = ({
  profile,
  posts,
  postsCount,
  firstBurialYear,
}) => {
  const initials = profile?.displayName
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {/* ================= PROFILE CARD ================= */}
      <div className="w-full bg-linear-to-r from-[#0b1026] via-[#111827] to-[#0b1026] border border-white/10 rounded-2xl px-8 py-6">
        <div className="flex gap-5 items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-black/40 border border-white/20 overflow-hidden flex items-center justify-center text-white text-xl font-semibold">
              {profile?.photoURL ? (
                <img
                  src={profile.photoURL}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                initials || "CG"
              )}
            </div>

            <NavLink
              to="edit-photo"
              className="absolute -bottom-1 -right-1 bg-black/80 border border-white/20 p-1.5 rounded-full"
            >
              <HiOutlinePencil className="text-white text-sm" />
            </NavLink>
          </div>

          <div>
            <h1 className="text-white text-xl font-semibold">
              @{profile?.username || "anonymous"}
            </h1>
            <p className="text-gray-400 text-sm italic mt-1 max-w-md">
              {profile?.bio || "Building things that break, so I don’t have to."}
            </p>
          </div>
        </div>

        <div className="my-6 border-t border-white/10" />

        <div className="grid grid-cols-2 text-center">
          <div>
            <p className="text-white text-lg font-semibold">{postsCount}</p>
            <p className="text-xs text-gray-400 uppercase">
              Failures Laid to Rest
            </p>
          </div>

          <div className="border-l border-white/10">
            <p className="text-white text-lg font-semibold">
              {firstBurialYear}
            </p>
            <p className="text-xs text-gray-400 uppercase">
              First Burial
            </p>
          </div>
        </div>
      </div>

      {/* ================= POSTS ================= */}
      <div className="mt-10">
        {posts.length === 0 && (
          <p className="text-gray-400 text-center mt-8">
            No posts yet 🪦
          </p>
        )}

        {posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <TombstonePostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default memo(ProfileCard);