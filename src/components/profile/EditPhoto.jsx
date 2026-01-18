import { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import gsap from "gsap";

import { updateUserProfile } from "../../backend/profile.service";
import { useAuthContext } from "../../context/AuthContext";

const EditPhoto = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { profile, setProfile } = useOutletContext();

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(profile?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // ===== refs =====
  const saveBtn = useRef(null);
  const cancelBtn = useRef(null);

  const saveText = useRef(null);
  const saveIcon = useRef(null);
  const saveHover = useRef(null);

  const cancelText = useRef(null);
  const cancelIcon = useRef(null);
  const cancelHover = useRef(null);

  if (!profile) return null;

  // ================= FILE =================
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  // ================= SAVE =================
  const handleSave = async (e) => {
    e.preventDefault();

    if (!photoFile) {
      toast.error("Please select a file first.");
      return;
    }

    gsap.set(saveBtn.current, {
      rotation: 0,
      borderRadius: "0.5rem",
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({ overwrite: "auto" });

    tl.to(saveBtn.current, {
      width: 44,
      height: 44,
      borderRadius: "50%",
      padding: 0,
      duration: 0.35,
      ease: "power3.inOut",
    })
      .to(saveBtn.current, {
        rotation: 360,
        duration: 0.6,
        ease: "power3.inOut",
      })
      .to(saveText.current, { opacity: 0, duration: 0.2 }, 0)
      .to(saveIcon.current, { opacity: 1, scale: 1, duration: 0.25 }, "-=0.25");

    try {
      setLoading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", photoFile);
      formData.append("upload_preset", "users_profile");
      formData.append("cloud_name", "dyurt1jtk");

      const imageData = await axios.post(
        "https://api.cloudinary.com/v1_1/dyurt1jtk/image/upload",
        formData,
        {
          onUploadProgress: (e) => {
            if (e.total) {
              setProgress(Math.round((e.loaded * 100) / e.total));
            }
          },
        }
      );

      const photoURL = imageData.data.secure_url;

      await updateUserProfile(user.uid, { photoURL });

      setProfile((prev) => ({ ...prev, photoURL }));
      toast.success("Profile photo updated");

      gsap.delayedCall(0.35, () => navigate("/profile"));
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 800);
    }
  };

  // ================= CANCEL =================
  const handleCancel = () => {
    if (gsap.isTweening(cancelBtn.current)) return;

    gsap.set(cancelBtn.current, {
      rotation: 0,
      borderRadius: "0.5rem",
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({
      overwrite: "auto",
      onComplete: () => {
        gsap.delayedCall(0.15, () => navigate("/profile"));
      },
    });

    tl.to(cancelBtn.current, {
      width: 44,
      height: 44,
      borderRadius: "50%",
      padding: 0,
      duration: 0.35,
      ease: "power3.inOut",
    })
      .to(
        cancelBtn.current,
        {
          rotation: -360,
          duration: 0.55,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        cancelIcon.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
        },
        0.15
      )
      .to(
        cancelText.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        0.25
      );
  };

  // ================= HOVER =================
  useEffect(() => {
    const setupHover = (btn, overlay) => {
      if (!btn || !overlay) return;

      const tween = gsap.fromTo(
        overlay,
        { xPercent: -120 },
        {
          xPercent: 120,
          duration: 0.6,
          ease: "power2.out",
          paused: true,
          overwrite: "auto",
        }
      );

      const onEnter = () => tween.restart();
      const onLeave = () => tween.reverse();

      btn.addEventListener("mouseenter", onEnter);
      btn.addEventListener("mouseleave", onLeave);

      return () => {
        btn.removeEventListener("mouseenter", onEnter);
        btn.removeEventListener("mouseleave", onLeave);
      };
    };

    const clean1 = setupHover(saveBtn.current, saveHover.current);
    const clean2 = setupHover(cancelBtn.current, cancelHover.current);

    return () => {
      clean1 && clean1();
      clean2 && clean2();
    };
  }, []);

  return (
    <div className="w-full h-full p-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <h1 className="text-xl font-semibold text-white mb-6">
          Update Profile Photo
        </h1>

        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-black/40 border border-white/20 overflow-hidden">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No photo
              </div>
            )}
          </div>

          <label className="cursor-pointer text-sm text-gray-300 hover:text-white">
            Choose Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* ✅ Progress bar (Spinner removed) */}
        {loading && (
          <div className="mt-6">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>

            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex gap-4 pt-8">
          {/* SAVE */}
          <button
            ref={saveBtn}
            onClick={handleSave}
            disabled={loading}
            className="relative overflow-hidden px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm disabled:opacity-60"
          >
            <span
              ref={saveHover}
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <span ref={saveText} className="relative">
              Save Photo
            </span>
            <span
              ref={saveIcon}
              className="absolute inset-0 flex items-center justify-center opacity-0 scale-0"
            >
              ✔
            </span>
          </button>

          {/* CANCEL */}
          <button
            ref={cancelBtn}
            onClick={handleCancel}
            disabled={loading}
            className="relative overflow-hidden px-6 py-2 rounded-lg border border-white/20 text-gray-300 hover:text-white text-sm disabled:opacity-60"
          >
            <span
              ref={cancelHover}
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            <span ref={cancelText} className="relative">
              Cancel
            </span>
            <span
              ref={cancelIcon}
              className="absolute inset-0 flex items-center justify-center opacity-0 scale-0"
            >
              ✖
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPhoto;
