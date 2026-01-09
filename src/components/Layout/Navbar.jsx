import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, loading } = useAuthContext();

  // 🔒 Prevent flicker
  if (loading) return null;

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md transition ${
      isActive
        ? "bg-emerald-500 text-black"
        : "text-white hover:bg-white/10"
    }`;

  return (
    <nav className="w-full px-6 py-4 bg-[#020617] border-b border-white/10 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold text-white">
        Creative Graveyard
      </div>

      {/* Links */}
      <div className="flex items-center gap-3">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/trending" className={linkClass}>
          Trending
        </NavLink>

        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>

        {/* 🔐 AUTH-BASED LINKS */}
        {!user && (
          <>
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
            <NavLink to="/signup" className={linkClass}>
              Signup
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink to="/create-post" className={linkClass}>
              Create Post
            </NavLink>
            <NavLink to="/profile" className={linkClass}>
              Profile
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
