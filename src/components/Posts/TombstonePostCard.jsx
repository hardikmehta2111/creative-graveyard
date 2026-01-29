import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import gsap from "gsap";
import { FaCross } from "react-icons/fa";
// import { HiOutlinePlus } from "react-icons/hi"; // ✝️ cross icon
// import { PiCrossBold } from "react-icons/pi";

const TombstonePostCard = ({ post }) => {
  const navigate = useNavigate();
  const tombRef = useRef(null);
  const [opening, setOpening] = useState(false);

  const dateText = post?.createdAt?.seconds
    ? new Date(post.createdAt.seconds * 1000).toDateString()
    : "Just now";

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);

    const el = tombRef.current;
    const rect = el.getBoundingClientRect();

    const viewportX = window.innerWidth / 2;
    const viewportY = window.innerHeight / 2;

    const elementX = rect.left + rect.width / 2;
    const elementY = rect.top + rect.height / 2;

    const deltaX = viewportX - elementX;
    const deltaY = viewportY - elementY;

    const tl = gsap.timeline({
      onComplete: () => navigate(`/post/${post.id}`),
    });

    tl
      .to(el, {
        x: deltaX,
        y: deltaY,
        rotateY: 360,
        duration: 1.7,
        ease: "power2.inOut",
      })
      .to(el, {
        scale: 2.4,
        duration: 0.5,
        ease: "power3.out",
      })
      .to(el, {
        opacity: 0,
        filter: "blur(18px)",
        duration: 0.35,
        ease: "power2.in",
      });
  };

  return (
    <div className="w-full max-w-[320px] mx-auto perspective-[1200px]">
      <div
        ref={tombRef}
        onClick={handleOpen}
        className="
          relative w-full h-[340px]
          bg-[#cbd5e1]/90
          rounded-t-[150px] rounded-b-[16px]
          shadow-2xl overflow-hidden
          cursor-pointer
          flex flex-col items-center
        "
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          zIndex: opening ? 999 : "auto",
        }}
      >
        {/* ✝️ CROSS AT TOP */}
        <div className="absolute top-6 flex justify-center w-full">
          <div className="w-10 h-10  flex items-center justify-center">
            <FaCross className="text-slate-800 h-10 w-10 " />
          </div>
        </div>

        {/* 📄 CENTER CONTENT */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-xl font-semibold text-slate-800 line-clamp-2">
            {post?.title || "Untitled"}
          </h2>

          <p className="mt-2 text-xs tracking-[0.35em] text-slate-700 uppercase">
            {dateText}
          </p>

          <p
            className="mt-4 text-[13px] text-slate-700 italic overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {post?.description || "No description..."}
          </p>
        </div>

        {/* 🪦 RIP */}
        <div className="pb-6">
          <p className="text-4xl font-bold text-slate-800/30 tracking-widest">
            R.I.P
          </p>
        </div>

        {/* GRASS */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#2f6f3a]" />
      </div>
    </div>
  );
};

export default TombstonePostCard;
