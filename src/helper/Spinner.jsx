const Spinner = ({ size = "md", fullScreen = false, text }) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-9 h-9 border-2",
    lg: "w-14 h-14 border-[3px]",
  };

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      {/* Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div
          className={`
            ${sizes[size]}
            rounded-full
            border border-white/20
            border-t-white/70
            animate-spin
          `}
        />

        {/* Inner Soul Dot */}
        <div
          className="
            absolute inset-0
            flex items-center justify-center
          "
        >
          <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
        </div>
      </div>

      {/* Optional Text */}
      {text && (
        <p className="text-xs text-gray-400 tracking-wide text-center">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Spinner;
