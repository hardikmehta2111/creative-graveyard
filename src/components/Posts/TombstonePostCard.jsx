import { NavLink } from "react-router-dom";

const TombstonePostCard = ({ post }) => {
  const dateText = post?.createdAt?.seconds
    ? new Date(post.createdAt.seconds * 1000).toDateString()
    : "Just now";

  return (
    <NavLink to={`/post/${post.id}`} className="block">
      <div className="w-full max-w-[320px] mx-auto">
        <div className="relative w-full h-[340px] bg-[#cbd5e1]/90 rounded-t-[150px] rounded-b-[16px] shadow-2xl overflow-hidden flex flex-col items-center px-6 pt-8">
          <h2 className="text-center text-xl font-semibold text-slate-800 leading-snug line-clamp-2">
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
    </NavLink>
  );
};

export default TombstonePostCard;
