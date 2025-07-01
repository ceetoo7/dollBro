import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]); // category IDs
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      console.log("Fetching products, page=", page);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      console.log("Received from API:", data);
      setLoading(false);
      if (data?.success) {
        setProducts((prev) =>
          page === 1 ? data.product : [...prev, ...data.product]
        );
        console.log("Updated product state:", page, data.product.length);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      if (data?.success) {
        setTotal(data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    }
  };

  // Fetch products based on selected categories
  const getFilteredProducts = async () => {
    try {
      if (checked.length === 0) return;

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-category",
        { categories: checked }
      );
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching filtered products");
    }
  };

  // Handle category checkbox change
  const handleCategoryFilter = (value, id) => {
    setChecked((prev) => {
      if (value) {
        if (!prev.includes(id)) return [...prev, id];
        return prev;
      } else {
        return prev.filter((c) => c !== id);
      }
    });
  };

  // 1. On mount
  useEffect(() => {
    getAllCategories();
    getTotal();
    getAllProducts(); // ALWAYS load first page
  }, []);

  // 2. On page increments
  useEffect(() => {
    if (page > 1) getAllProducts(); // only append new pages
  }, [page]);

  // 3. On filter changes
  useEffect(() => {
    if (checked.length === 0) {
      setProducts([]);
      setPage(1);
      getAllProducts();
    } else {
      setProducts([]);
      getFilteredProducts();
    }
  }, [checked]);

  return (
    <Layout title={"All Products"}>
      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar */}
        <div className="md:w-65 md:min-h-screen w-full bg-gray-100 p-5 shadow-md">
          {/* Category Filter */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Filter by Category</h6>
            {categories?.map((c) => (
              <div key={c._id} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-violet-600"
                    onChange={(e) =>
                      handleCategoryFilter(e.target.checked, c._id)
                    }
                  />
                  <span className="ml-2 text-gray-700">{c.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full p-4">
          <h2 className="text-xl font-semibold mb-4">All Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="p-4 bg-gray-100">
                    <h5 className="text-lg font-semibold text-gray-800">
                      {p.name}
                    </h5>
                    <p className="my-1 text-gray-600 text-sm">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="text-l  my-1 text-green-700 ">
                      NRs {p.price}
                    </p>
                    <div className="flex justify-end safe">
                      <button
                        className="width-20 bg-violet-900 text-white mr-4 px-2 py-1 rounded-sm hover:bg-violet-700"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More...
                      </button>
                      <button className="width-20 bg-red-700 text-white px-2 py-1 rounded-sm hover:bg-red-600">
                        + Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
          <div className="m-2 p-2">
            {products && products.length < total && (
              <button
                className=" rounded-lg text-white bg-violet-800 hover:bg-violet-500 hover:text-black px-4 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : " Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
