import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Model({ closeModal, openSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/users/login",
        {
          email,
          password,
        }
      );

      if (res.data.status) {
        toast.success("Login successful");

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        closeModal();

        navigate("/");
      }

    } catch (err) {

  const message = err.response?.data?.message;

  if (message === "Please verify your email first.") {

    toast.info("Please verify your email first");

    navigate("/verify-otp", {
      state: {
        email,
      },
    });

    closeModal();

  } else {

    setError(message || "Login failed");

  }

}
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-5 sm:p-6 rounded-lg w-[90%] max-w-sm">

        <h2 className="text-2xl font-bold text-center mb-5">
          Sign In
        </h2>


        {error && (
          <div className="bg-red-500 text-white p-2 mb-3 rounded text-center">
            {error}
          </div>
        )}


        <label>Email</label>

        <input
          type="email"
          placeholder="abc@gmail.com"
          className="w-full p-2 my-2 rounded-md text-black border-2"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <label>Password</label>

        <input
          type="password"
          placeholder="abc123"
          className="w-full p-2 my-2 rounded-md text-black border-2"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


        <p className="mt-2">
          New user?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={openSignUp}
          >
            Sign Up
          </span>
        </p>


        <div className="flex justify-center gap-5 mt-5">

          <button
            onClick={closeModal}
            className="bg-gray-400 p-2 rounded-md"
          >
            Cancel
          </button>


          <button
            onClick={handleSignIn}
            className="bg-orange-500 text-white p-2 rounded-md"
          >
            Sign In
          </button>

        </div>

      </div>

    </div>
  );
}