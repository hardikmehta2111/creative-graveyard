import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { signupUser, signupWithGoogle } from "../../backend/auth.service";
// import { signupUser, signupWithGoogle } from "../backend/auth.service.js";

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
      toast.success(
        "Verification email sent. Please verify and login."
      );
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#1e1b4b]">
      <div className="w-full max-w-md bg-[#0b1026]/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
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
            className="w-full px-4 py-3 rounded-lg bg-[#020617] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInput}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#020617] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              className="w-full px-4 py-3 pr-12 rounded-lg bg-[#020617] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              className="w-full px-4 py-3 pr-12 rounded-lg bg-[#020617] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          {/* Email Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 transition py-3 rounded-lg font-semibold text-black disabled:opacity-60"
          >
            Sign up
          </button>
        </form>

        {/* Divider */}
        <div className="text-center text-gray-400 my-4">or</div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-white hover:bg-gray-100 transition py-3 rounded-lg font-semibold text-black"
        >
          Continue with Google
        </button>

        {/* Login Redirect */}
        <p className="text-center text-gray-400 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
