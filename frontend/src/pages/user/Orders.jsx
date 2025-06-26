import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Orders = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div>
          <UserMenu />
        </div>
        <div className="p-5">
          <h1>All Orders</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
