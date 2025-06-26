import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

const API = import.meta.env.VITE_REACT_APP_API;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        toast.success("Login Successful");

        // Redirect to home page after login, regardless of role
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Layout title="Login" description="Sign in to your account">
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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

            <button
              type="submit"
              className="w-full mb-3 bg-violet-900 text-white py-2 rounded hover:bg-violet-800 transition duration-300"
            >
              Login
            </button>

            <button
              type="button"
              className="w-full text-violet-900 py-2 rounded hover:text-violet-700 hover:underline "
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>

            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="text-violet-900 hover:underline hover:text-violet-700"
              >
                Register
              </NavLink>
            </p>
          </form>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Login;
