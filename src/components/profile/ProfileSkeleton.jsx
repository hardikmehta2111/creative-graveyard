import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse w-full">
      {/* ================= PROFILE CARD SKELETON ================= */}
      <div className="relative w-full bg-linear-to-r from-[#0b1026] via-[#111827] to-[#0b1026] border border-white/10 rounded-2xl px-5 py-6 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 border border-white/5 mx-auto sm:mx-0"></div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 w-full flex flex-col items-center sm:items-start space-y-3 mt-1">
            {/* Username */}
            <div className="h-7 w-48 bg-white/10 rounded"></div>
            {/* Bio */}
            <div className="h-4 w-full max-w-sm bg-white/5 rounded"></div>
            <div className="h-4 w-2/3 max-w-xs bg-white/5 rounded"></div>
          </div>
        </div>

        <div className="my-6 border-t border-white/10" />

        {/* Stats Section */}
        <div className="grid grid-cols-2 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-8 bg-white/10 rounded"></div>
            <div className="h-3 w-24 bg-white/5 rounded"></div>
          </div>

          <div className="border-l border-white/10 flex flex-col items-center gap-2">
            <div className="h-6 w-12 bg-white/10 rounded"></div>
            <div className="h-3 w-20 bg-white/5 rounded"></div>
          </div>
        </div>
      </div>

      {/* ================= POSTS SKELETON ================= */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full max-w-[320px] mx-auto perspective-[1200px]">
            <div className="relative w-full h-[340px] bg-white/5 rounded-t-[150px] rounded-b-[16px] border border-white/5 shadow-2xl flex flex-col items-center overflow-hidden">
              
              {/* Cross */}
              <div className="mt-8 w-10 h-10 bg-white/10 rounded-sm"></div>

              {/* Content */}
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center w-full space-y-4">
                {/* Title */}
                <div className="h-6 w-3/4 bg-white/10 rounded"></div>
                {/* Date */}
                <div className="h-3 w-1/3 bg-white/5 rounded"></div>
                {/* Description */}
                <div className="h-4 w-2/3 bg-white/5 rounded"></div>
              </div>

              {/* Footer */}
              <div className="pb-8 w-full flex justify-center">
                 <div className="h-8 w-16 bg-white/5 rounded"></div>
              </div>

              {/* Grass */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
