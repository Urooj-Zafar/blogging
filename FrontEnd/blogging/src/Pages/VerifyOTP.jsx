import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function VerifyOTP({ openSignIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!email || !otp) {
      toast.error("Email and OTP are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/users/verify-otp",
        {
          email,
          otp,
        }
      );

      if (res.data.status) {
        toast.success("Email verified successfully!");
        setOtp("");
        navigate("/");
         setTimeout(() => {
    openSignIn();
  }, 500);
      } else {
        toast.error(res.data.message);
      }

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };


  const handleResend = async () => {
    if (!email) {
      toast.error("Enter your email");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/users/resend-otp",
        {
          email,
        }
      );

      if (res.data.status) {
        toast.success("New OTP sent successfully");
      } else {
        toast.error(res.data.message);
      }

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to resend OTP"
      );
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Verify Email
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Enter the 6-digit OTP sent to your email.
        </p>


        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        <input
          type="text"
          placeholder="Enter OTP"
          maxLength={6}
          className="w-full border rounded-lg p-3 mb-6 tracking-[8px] text-center text-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />


        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition disabled:bg-orange-300"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>


        <button
          onClick={handleResend}
          className="w-full mt-4 border border-orange-500 text-orange-500 py-3 rounded-lg hover:bg-orange-50 transition"
        >
          Resend OTP
        </button>


        <button
          onClick={() => navigate("/")}
          className="w-full mt-3 text-gray-500 hover:text-black"
        >
          Back to Home
        </button>

      </div>

    </div>
  );
}