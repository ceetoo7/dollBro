import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard Doll Bro"}>
      <div className="flex flex-col md:flex-row">
        <div>
          <UserMenu />
        </div>
        <div className="p-5">
          <h3>Name: {auth?.user?.name}</h3>
          <h3>Email: {auth?.user?.email}</h3>
          <h3>Address: {auth?.user?.address}</h3>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
