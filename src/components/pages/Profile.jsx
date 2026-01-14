import { useOutletContext } from "react-router-dom";
import ProfileCard from "../profile/ProfileCard";

const Profile = () => {
  // 🔥 profile comes from ProfileLayout
  const { profile } = useOutletContext();

  // Safety guard (should rarely trigger)
  if (!profile) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <ProfileCard profile={profile} />
    </div>
  );
};

export default Profile;
