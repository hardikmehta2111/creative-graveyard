import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { signupUser, signupWithGoogle } from "../../backend/auth.service";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { fullName, email, password, confirmPassword } = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await signupUser(email, password);
      toast.success("Verification email sent. Please verify and login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signupWithGoogle();
      toast.success("Signed up with Google");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#020617] to-black px-4">

      

      {/* Tombstone Card */}
      <div
        className="
          mt-10 w-full max-w-md
          bg-[#0b1026]/80 backdrop-blur-xl
          border border-white/10
          rounded-t-[180px] rounded-b-2xl
          p-8 pt-12
          shadow-2xl
        "
      >
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Create an account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={fullName}
            onChange={handleInput}
            required
            className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInput}
            required
            className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInput}
              required
              className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 pr-12 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleInput}
              required
              className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 pr-12 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Anonymity Guaranteed Box */}
          <div className="rounded-xl bg-black/40 border border-white/10 p-4">
            <p className="flex items-center gap-2 text-sm text-white font-medium">
              <IoEyeOff className="text-base opacity-80" />
              Anonymity Guaranteed
            </p>

            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Failure should be shared without fear. Post as a{" "}
              <span className="text-white">Ghost</span> (Anonymous) or use your real name.
            </p>
          </div>


          {/* Signup Button (UNCHANGED TEXT) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/10 hover:bg-white/20 transition py-3 rounded-lg font-semibold text-white disabled:opacity-60"


          >
            Sign up
          </button>
        </form>

        {/* Divider */}
        <div className="text-center text-gray-400 my-4">or</div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="
    w-full
    flex items-center justify-center gap-3
    bg-black/40 hover:bg-black/60
    border border-white/10
    transition
    py-3 rounded-lg
    font-semibold text-white
  "
        >
          Continue with Google <FcGoogle className="text-lg" />
        </button>


        {/* Login Redirect */}
        <p className="text-center text-gray-400 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>

      <p className="mt-8 text-xs text-gray-600">
        R.I.P. Creative Graveyard
      </p>
    </div>
  );
};

export default Signup;
