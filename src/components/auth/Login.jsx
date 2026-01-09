import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../backend/auth.service";

const Login = () => {
    let navigate = useNavigate()
    let [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await loginUser(email, password);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#1e1b4b]">
      <div className="w-full max-w-md bg-[#0b1026]/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-400 block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInput}
              placeholder="Enter email"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#020617] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400 block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleInput}
                placeholder="Enter password"
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 transition py-3 rounded-lg font-semibold text-black"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-gray-400 mt-5">
          New here?{" "}
          <NavLink to="/signup" className="text-emerald-400 hover:underline">
            Create an account
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
