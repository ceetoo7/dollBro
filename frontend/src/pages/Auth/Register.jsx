import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_REACT_APP_API;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log("API URL:", API); // ✅ Debug check

      const res = await axios.post(`${API}/auth/register`, {
        name,
        email,
        address,
        phone,
        password,
        answer,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Layout title="Register" description="Create a new account">
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Answer
              </label>
              <input
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="What is your faviorate sports?"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-violet-900 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>

            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-violet-900 hover:underline hover:text-violet-700"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Register;
