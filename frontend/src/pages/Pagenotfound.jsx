import React from "react";
import Layout from "../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout
      title={"Page not found-Go back"}
      description={"Doll Bro Page not found"}
      keywords={
        "dollnepal dollbro ,dollmandu, doll store in nepal, teddy bear in nepal"
      }
      author={"Chandan Chaudhary"}
    >
      <div className="flex flex-col justify-center items-center min-h-[70vh] text-center">
        {" "}
        <h1 className="text-2xl font-black">404</h1>
        <h1>Oops! Page not found</h1>
        <button className="mt-4 px-6 py-2 bg-violet-900 hover:bg-violet-500 text-white rounded shadow hover:bg-gray-200 transition">
          <a href="../../">Go Back</a>
        </button>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
