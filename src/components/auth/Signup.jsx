import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

import { signupUser, signupWithGoogle } from "../../backend/auth.service";
import Spinner from "../../helper/Spinner";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { fullName, username, email, password, confirmPassword } = formData;

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

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      toast.error("Username can contain only letters, numbers & underscores");
      return;
    }

    try {
      setLoading(true);

      await signupUser(
        email,
        password,
        fullName,
        username.toLowerCase()
      );

      toast.success("Verification email sent. Please verify and login.");

      setTimeout(() => {
        navigate("/login");
      }, 800);

    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await signupWithGoogle();
      toast.success("Signed up with Google");
      setTimeout(() => navigate("/"), 600);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center  px-4">

      {loading && (
        <Spinner fullScreen text="Preparing your grave..." />
      )}

      <div className="mt-10 w-full max-w-md bg-[#0b1026]/80 backdrop-blur-xl border border-white/10 rounded-t-[180px] rounded-b-2xl p-8 pt-12 shadow-2xl">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Create an account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={fullName}
            onChange={handleInput}
            required
            className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white text-sm"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInput}
            required
            className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white text-sm"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInput}
            required
            className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white text-sm"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInput}
              required
              className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 pr-12 text-white text-sm"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleInput}
              required
              className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 pr-12 text-white text-sm"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showConfirmPassword ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-lg text-white font-semibold"
          >
            Sign up
          </button>
        </form>

        <div className="text-center text-gray-400 my-4">or</div>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 border border-white/10 py-3 rounded-lg text-white font-semibold"
        >
          Continue with Google <FcGoogle />
        </button>

        <p className="text-center text-gray-400 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
