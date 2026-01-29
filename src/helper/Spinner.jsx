import { useEffect, useRef } from "react";
import gsap from "gsap";

const Spinner = ({ fullScreen = false, text = "Crossing the veil..." }) => {
  const coffinRef = useRef(null);
  const graveRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    // initial state
    gsap.set(coffinRef.current, {
      opacity: 1,
      scale: 1,
      rotate: 0,
    });

    gsap.set(graveRef.current, {
      opacity: 0,
      scale: 0.9,
      rotate: 0,
    });

    tl
      // ⚰️ Coffin visible + spin
      .to(coffinRef.current, {
        rotate: 360,
        duration: 0.5,
        ease: "linear",
      })

      // hide coffin
      .to(coffinRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.15,
      })

      // 🪦 show tombstone
      .to(graveRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.15,
      })

      // 🪦 Tombstone visible + spin
      .to(graveRef.current, {
        rotate: -360,
        duration: 0.5,
        ease: "linear",
      })

      // hide tombstone
      .to(graveRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.15,
      })

      // ⚰️ show coffin again
      .to(coffinRef.current, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.15,
      });

    // 📝 text pulse
    gsap.to(textRef.current, {
      opacity: 0.4,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const spinnerUI = (
    <div className="flex flex-col items-center gap-6">
      {/* Icons */}
      <div className="relative w-20 h-20 text-6xl">
        <div
          ref={coffinRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          ⚰️
        </div>

        <div
          ref={graveRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          🪦
        </div>
      </div>

      {/* Text */}
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

  // 🌍 Full screen (global usage)
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md">
        {spinnerUI}
      </div>
    );
  }

  // inline usage
  return spinnerUI;
};

export default Spinner;
