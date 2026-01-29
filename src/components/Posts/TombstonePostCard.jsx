import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import gsap from "gsap";

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

    // 🔥 viewport center
    const viewportX = window.innerWidth / 2;
    const viewportY = window.innerHeight / 2;

    // 🔥 element center
    const elementX = rect.left + rect.width / 2;
    const elementY = rect.top + rect.height / 2;

    // 🔥 distance to center
    const deltaX = viewportX - elementX;
    const deltaY = viewportY - elementY;

    const tl = gsap.timeline({
      onComplete: () => navigate(`/post/${post.id}`),
    });

    tl
      // 1️⃣ Move grave to CENTER + spin
      .to(el, {
        x: deltaX,
        y: deltaY,
        rotateY: 360,
        duration: 1.7,
        ease: "power2.inOut",
      })

      // 2️⃣ Scale UP (comes out of screen)
      .to(el, {
        scale: 2.4,
        duration: 0.5,
        ease: "power3.out",
      })

      // 3️⃣ Dissolve
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
          flex flex-col items-center px-6 pt-8
          cursor-pointer
        "
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          zIndex: opening ? 999 : "auto",
        }}
      >
        <h2 className="text-center text-xl font-semibold text-slate-800 line-clamp-2">
          {post?.title || "Untitled"}
        </h2>

        <p className="mt-2 text-xs tracking-[0.35em] text-slate-700 uppercase">
          {dateText}
        </p>

        <p
          className="mt-5 text-center text-[13px] text-slate-700 italic px-3 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {post?.description || "No description..."}
        </p>

        <div className="mt-auto pb-5">
          <p className="text-4xl font-bold text-slate-800/30 tracking-widest">
            R.I.P
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#2f6f3a]" />
      </div>
    </div>
  );
};

export default TombstonePostCard;
