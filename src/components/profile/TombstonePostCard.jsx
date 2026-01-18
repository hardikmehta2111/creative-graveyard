const TombstonePostCard = ({ post }) => {
  const dateText = post?.createdAt?.seconds
    ? new Date(post.createdAt.seconds * 1000).toDateString()
    : "Just now";

  return (
    <div className="w-full max-w-[320px] mx-auto">
      <div className="relative w-full h-[420px] bg-[#cbd5e1]/90 rounded-t-[170px] rounded-b-[16px] shadow-2xl overflow-hidden flex flex-col items-center px-6 pt-14">
        <h2 className="text-center text-2xl font-semibold text-slate-800 leading-snug">
          {post?.title || "Untitled"}
        </h2>

        <p className="mt-3 text-xs tracking-[0.35em] text-slate-700 uppercase">
          {dateText}
        </p>

        <p className="mt-8 text-center text-sm text-slate-700 italic line-clamp-4">
          {post?.description || "No description..."}
        </p>

        <div className="mt-auto pb-8">
          <p className="text-5xl font-bold text-slate-800/10 tracking-widest">
            R.I.P
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#2f6f3a]" />
      </div>
    </div>
  );
};

export default TombstonePostCard;
