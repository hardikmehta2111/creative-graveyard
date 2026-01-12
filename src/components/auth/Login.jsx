import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../backend/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await loginUser(email, password);
      toast.success("Welcome back to the sanctuary");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#020617] to-black px-4">

     
      {/* Tombstone Card */}
      <div
        className="
          mt-10 w-full max-w-md
          bg-white/5 border border-white/10 backdrop-blur-xl
          rounded-t-[180px] rounded-b-3xl
          p-6 pt-12 sm:p-8 sm:pt-14
          shadow-2xl
        "
      >
        <h2 className="text-white text-xl font-semibold text-center mb-1">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Welcome back to the sanctuary.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInput}
              placeholder="creator@example.com"
              required
              className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleInput}
                placeholder="••••••••"
                required
                className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 pr-12 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {showPassword ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-white/70" />
              Remember me
            </label>

            <NavLink
              to="/forgot-password"
              className="hover:text-white transition"
            >
              Forgot password?
            </NavLink>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full mt-4 h-11 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition"
          >
            Login
          </button>
        </form>

        {/* Signup */}
        <p className="mt-6 text-center text-xs sm:text-sm text-gray-500">
          New to the graveyard?{" "}
          <NavLink
            to="/signup"
            className="text-white hover:underline"
          >
            Bury your first idea
          </NavLink>
        </p>
      </div>

      {/* Footer */}
      <div className="mt-10 text-xs text-gray-500 flex gap-4">
        <span>Terms</span>
        <span>Privacy</span>
        <span>Contact</span>
      </div>

      <p className="mt-2 text-xs text-gray-600">
        R.I.P. Creative Graveyard
      </p>
    </div>
  );
};

export default Login;
