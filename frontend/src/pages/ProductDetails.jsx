import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (slug) fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${slug}`
      );
      setProduct(data.product);

      if (data.product?._id && data.product?.category?._id) {
        fetchRelatedProducts(data.product._id, data.product.category._id);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-20 text-gray-600 text-lg">
          Loading product...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* PRODUCT DETAILS */}
      <div className="flex flex-col md:flex-row gap-6 p-4 lg:p-10">
        {/* Image */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm p-4">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            className="w-full max-h-[500px] object-contain rounded-xl"
          />
        </div>

        {/* Info */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 p-6 bg-violet-50 rounded-xl border border-violet-200 shadow-sm">
          <h1 className="text-3xl font-bold text-violet-800">{product.name}</h1>
          <p className="text-sm text-gray-600 leading-relaxed text-justify">
            {product.description}
          </p>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-medium text-gray-900">Color:</span>{" "}
              {product.color}
            </p>
            <p>
              <span className="font-medium text-gray-900">Category:</span>{" "}
              {product.category?.name}
            </p>
            <p>
              <span className="font-medium text-gray-900">Shipping:</span>{" "}
              {product.shipping ? "Available" : "Not Available"}
            </p>
          </div>
          <div className="text-2xl text-green-600 font-bold">
            NRs {product.price}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button className="bg-violet-700 hover:bg-violet-600 text-white py-2 px-6 rounded-full w-full sm:w-1/2 transition">
              BUY
            </button>
            <button className="bg-red-700 hover:bg-red-600 text-white py-2 px-6 rounded-full w-full sm:w-1/2 transition">
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-12 px-4 lg:px-10 pb-10">
        <h2 className="text-2xl font-semibold text-violet-800 mb-6">
          Similar Products
        </h2>
        {relatedProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">No similar products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition duration-200 overflow-hidden border"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="p-4">
                  <h5 className="text-md font-bold text-gray-800 mb-1 truncate">
                    {p.name}
                  </h5>
                  <p className="text-gray-600 text-sm mb-2">
                    {p.description?.substring(0, 50)}...
                  </p>
                  <p className="text-green-600 font-bold mb-3">NRs {p.price}</p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center">
                    <button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="bg-violet-700 hover:bg-violet-600 text-white text-xs md:w-[40%] w-full py-2 rounded-xl transition"
                    >
                      View
                    </button>
                    <button className="bg-red-700 hover:bg-red-600 text-white text-xs md:w-[40%] w-full py-2 rounded-xl transition">
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
