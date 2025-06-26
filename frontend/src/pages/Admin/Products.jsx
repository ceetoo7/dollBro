import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

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
    <Layout title="All Products">
      <div className="flex flex-col md:flex-row">
        <div>
          <AdminMenu />
        </div>
        <div className="w-full p-4">
          <h1 className="text-sm mb-4">All Products List</h1>

          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.isArray(products) &&
              products.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
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
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
