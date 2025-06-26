import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";

const Shop = () => {
  const [auth, setAuth] = useAuth([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      console.log("Products API Response:", data);
      if (data?.success) {
        setProducts(data.product); // Ensure this matches the actual key
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching products");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Products"}>
      <div className="md:flex">
        <div className="md:w-[25%] p-4 bg-red-800">
          <h6>Filter by category</h6>
        </div>
        <div className=" md:w-[75%] p-4 bg-violet-800">
          <h2>All products</h2>
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.isArray(products) &&
              products.map((p) => (
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    className="w-full h-48 object-cover"
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-semibold text-gray-800">
                      {p.name}
                    </h5>
                    <p className="mt-2 text-gray-600 text-sm">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
