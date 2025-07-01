import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Header from "../../components/Layout/Header";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      {/* Sidebar + Main Content Container */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <AdminMenu />

        {/* Main Content */}
        <div className="flex-1 p-5">
          <h3>Admin Name: {auth?.user?.name}</h3>
          <h3>Admin Email: {auth?.user?.email}</h3>
          <h3>Admin Contact: {auth?.user?.phone}</h3>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
