import { useEffect, useRef } from "react";
import gsap from "gsap";

const Spinner = ({ fullScreen = false, text = "Digging your grave..." }) => {
  const shovelRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const headRef = useRef(null);
  const dirtRef = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    // 🪓 shovel + arms digging loop
    tl.to([shovelRef.current, rightArmRef.current], {
      rotation: -25,
      y: 8,
      duration: 0.35,
      ease: "power2.inOut",
      transformOrigin: "bottom center",
    })
      .to([shovelRef.current, rightArmRef.current], {
        rotation: 15,
        y: -10,
        duration: 0.35,
        ease: "power2.inOut",
        transformOrigin: "bottom center",
      })
      .to([shovelRef.current, rightArmRef.current], {
        rotation: -10,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
        transformOrigin: "bottom center",
      });

    // 🦴 left arm small movement
    gsap.to(leftArmRef.current, {
      rotation: 12,
      duration: 0.35,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      transformOrigin: "top center",
    });

    // 💀 head bounce
    gsap.to(headRef.current, {
      y: 2,
      duration: 0.35,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // 🟤 dirt particles popping
    dirtRef.current.forEach((dot, i) => {
      gsap.fromTo(
        dot,
        { opacity: 0, y: 0, x: 0, scale: 0.7 },
        {
          opacity: 1,
          y: -18,
          x: i % 2 === 0 ? -12 : 12,
          scale: 1,
          duration: 0.35,
          repeat: -1,
          yoyo: true,
          ease: "power2.out",
          delay: i * 0.12,
        }
      );
    });

    // 📝 text pulse
    gsap.to(textRef.current, {
      opacity: 0.35,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const spinnerUI = (
    <div className="flex flex-col items-center gap-4">
      {/* Scene */}
      <div className="relative w-36 h-36">
        {/* 💀 Head */}
        <div
          ref={headRef}
          className="absolute top-5 left-1/2 -translate-x-1/2"
        >
          <div className="w-10 h-10 rounded-full bg-white/90 border border-white/20 flex items-center justify-center relative">
            {/* eyes */}
            <span className="absolute left-2 top-3 w-2 h-2 rounded-full bg-black/80" />
            <span className="absolute right-2 top-3 w-2 h-2 rounded-full bg-black/80" />
            {/* mouth */}
            <span className="absolute bottom-2 w-4 h-[2px] bg-black/60 rounded" />
          </div>
        </div>

        {/* 🦴 Body */}
        <div className="absolute top-[62px] left-1/2 -translate-x-1/2 w-8 h-10 bg-white/70 border border-white/10 rounded-xl" />

        {/* 🦴 Left Arm */}
        <div
          ref={leftArmRef}
          className="absolute top-[70px] left-[42px] w-3 h-10 bg-white/70 rounded-full origin-top"
        >
          <div className="absolute bottom-0 left-[-4px] w-5 h-2 bg-white/70 rounded-md" />
        </div>

        {/* 🦴 Right Arm + Shovel */}
        <div
          ref={rightArmRef}
          className="absolute top-[70px] right-[42px] w-3 h-10 bg-white/70 rounded-full origin-top"
        >
          <div className="absolute bottom-0 left-[-4px] w-5 h-2 bg-white/70 rounded-md" />
        </div>

        {/* 🪓 Shovel */}
        <div
          ref={shovelRef}
          className="absolute top-[72px] right-[18px] w-[6px] h-16 bg-white/60 rounded-full origin-bottom"
        >
          {/* blade */}
          <div className="absolute bottom-[-2px] left-[-10px] w-7 h-4 bg-white/70 rounded-md border border-white/10" />
        </div>

        {/* 🟤 Dirt particles */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              ref={(el) => (dirtRef.current[i] = el)}
              className="w-2 h-2 rounded-full bg-[#8b5e3c] opacity-0"
            />
          ))}
        </div>

        {/* Ground */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#2f6f3a] rounded-full opacity-70" />
      </div>

      {/* text */}
      {text && (
        <p
          ref={textRef}
          className="text-xs text-gray-400 tracking-wide text-center"
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
        {spinnerUI}
      </div>
    );
  }

  return spinnerUI;
};

export default Spinner;
