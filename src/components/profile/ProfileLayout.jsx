import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import { getUserProfile } from "../../backend/profile.service";
import { useAuthContext } from "../../context/AuthContext";
import Spinner from "../../helper/Spinner";

const ProfileLayout = () => {
  const { user } = useAuthContext();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile(user.uid);
        setProfile(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.uid]);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">
      {/* ✅ SIDEBAR (no scroll) */}
      <div className="shrink-0">
        <ProfileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ✅ ONLY MAIN CONTENT scroll */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-black via-[#020617] to-black p-4 md:p-6">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Spinner text="Loading profile..." />
          </div>
        ) : (
          <Outlet context={{ profile, setProfile, setSidebarOpen }} />
        )}
      </main>
    </div>
  );
};

export default ProfileLayout;
