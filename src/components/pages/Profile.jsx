import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ProfileCard from "../profile/ProfileCard";
import EditProfile from "../profile/EditProfile";

const Profile = () => {
  // profile from ProfileLayout
  const { profile: outletProfile } = useOutletContext();

  // 🔥 LOCAL STATE (THIS IS NEW)
  const [profile, setProfile] = useState(outletProfile);
  const [isEditing, setIsEditing] = useState(false);

  // keep local state in sync on first load / refresh
  useEffect(() => {
    setProfile(outletProfile);
  }, [outletProfile]);

  if (!profile) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">

      {/* Profile Card */}
      <ProfileCard
        profile={profile}
        onEdit={() => setIsEditing(true)}
      />

      {/* Edit Profile inline */}
      {isEditing && (
        <EditProfile
          profile={profile}
          onClose={() => setIsEditing(false)}
          onUpdate={(updatedProfile) => {
            setProfile(updatedProfile); // 🔥 THIS IS THE REFRESH
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default Profile;
