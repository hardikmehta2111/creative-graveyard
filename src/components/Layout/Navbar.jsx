import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "../pages/Logo";

const Navbar = () => {
  const { user, loading } = useAuthContext();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  const linkClass = ({ isActive }) =>
    `px-4 py-1.5 rounded-full text-sm font-medium transition ${
      isActive
        ? "bg-white/10 text-white border border-white/20"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="w-full bg-gradient-to-r from-black via-[#020617] to-black border-b border-white/10">
      <div className="max-w-7xl mx-auto py-4 flex justify-between items-center logo-font">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3 text-white font-semibold tracking-wide logo-font hover:opacity-90 transition"
        >
          <Logo />
          <span className="hidden sm:block text-lg logo-font">
            CREATIVE GRAVEYARD
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/explore" className={linkClass}>
            Explore
          </NavLink>

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
                Bury Your Idea
              </NavLink>

              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3">
          <NavLink onClick={() => setOpen(false)} to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to="/explore"
            className={linkClass}
          >
            Explore
          </NavLink>

          {!user && (
            <>
              <NavLink
                onClick={() => setOpen(false)}
                to="/login"
                className={linkClass}
              >
                Login
              </NavLink>
              <NavLink
                onClick={() => setOpen(false)}
                to="/signup"
                className={linkClass}
              >
                Signup
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink
                onClick={() => setOpen(false)}
                to="/create-post"
                className={linkClass}
              >
                Bury Your Idea
              </NavLink>

              <NavLink
                onClick={() => setOpen(false)}
                to="/profile"
                className={linkClass}
              >
                Profile
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
