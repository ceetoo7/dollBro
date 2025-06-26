import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const API = import.meta.env.VITE_REACT_APP_API;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log("API URL:", API); // ✅ Debug check

      const res = await axios.post(`${API}/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
    }
  };
  return (
    <Layout title={"Forgot password "}>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit}>
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
              <label
                className="block text-gray-700 mb-2"
                htmlFor="secretAnswer"
              ></label>
              Secret Answer
              <input
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your faviorate sport"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your new password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mb-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
