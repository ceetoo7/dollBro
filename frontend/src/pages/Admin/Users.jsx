import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  return (
    <Layout title={"users"}>
      <div className="flex flex-col md:flex-row">
        <div>
          <AdminMenu />
        </div>

        <div className="p-5">
          <h1>All Users</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
