import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SignUp({ closeModal }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleSignUp = async () => {

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }


    try {

      const res = await axios.post(
        "http://localhost:3000/users/register",
        {
          name,
          email,
          password,
        }
      );


      if (res.data.status) {

        toast.success("OTP sent to your email");


        navigate("/verify-otp", {
          state: {
            email: res.data.email,
          },
        });


        closeModal();


      } else {

        setError(res.data.message || "Sign Up failed");

      }


    } catch (err) {

      setError(
        err.response?.data?.message || "Sign Up failed"
      );

    }

  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">

      <div className="bg-white p-5 sm:p-6 rounded-lg w-[90%] max-w-sm">


        <h2 className="text-2xl font-bold text-center mb-4">
          Sign Up
        </h2>


        {error && (
          <div className="bg-red-500 text-white p-2 mb-3 rounded text-center">
            {error}
          </div>
        )}



        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 my-2 rounded-md text-black border-2"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />



        <input
          type="email"
          placeholder="abc@gmail.com"
          className="w-full p-2 my-2 rounded-md text-black border-2"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />



        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 my-2 rounded-md text-black border-2"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />



        <div className="flex justify-center gap-5 mt-5">

          <button
            onClick={closeModal}
            className="bg-gray-400 p-2 rounded-md"
          >
            Cancel
          </button>


          <button
            onClick={handleSignUp}
            className="bg-orange-500 text-white p-2 rounded-md"
          >
            Sign Up
          </button>


        </div>


      </div>

    </div>
  );
}