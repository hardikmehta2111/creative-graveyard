import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Spinner from "../../helper/Spinner";
import { resetPassword } from "../../backend/auth.service";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(email);

      toast.success("Password reset link sent to your email");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-[#020617] to-black px-4">

      {loading && (
        <Spinner fullScreen text="Summoning recovery ritual..." />
      )}

      <div className="w-full max-w-md bg-[#0b1026]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        
        <h1 className="text-2xl font-semibold text-white text-center mb-2">
          Forgot Password
        </h1>

        <p className="text-sm text-gray-400 text-center mb-6">
          We’ll send you a resurrection link
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-11 rounded-lg bg-black/40 border border-white/10 px-4 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/10 hover:bg-white/20 transition py-3 rounded-lg font-semibold text-white disabled:opacity-60"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-gray-400 mt-5 text-sm">
          Remembered your password?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
