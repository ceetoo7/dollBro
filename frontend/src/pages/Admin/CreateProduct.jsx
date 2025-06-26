import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [categories, setCategories] = useState([]);

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategories();

    // Cleanup preview URL on unmount
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle photo change and update preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke old preview URL if exists
      if (preview) URL.revokeObjectURL(preview);

      const objectUrl = URL.createObjectURL(file);
      setPhoto(file);
      setPreview(objectUrl);
    }
  };

  //create product function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token;

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("color", color);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products"); // ✅ Navigate on success
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Create Product Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Create Product"}>
      <div className="flex flex-col md:flex-row">
        <div>
          <AdminMenu />
        </div>
        <div className="w-full p-4">
          <h1 className="text-xl font-semibold mb-4">Create Product</h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-4 rounded shadow m-auto w-[95%] md:w-[70%] lg:w-[60%]"
          >
            <div>
              <label className="block mb-1 font-medium">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Select Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Color</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Shipping</label>
              <select
                value={shipping}
                onChange={(e) => setShipping(e.target.value === "true")}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="mb-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-48 w-full object-cover rounded"
                />
              </div>
            )}

            <div>
              <label className="block mb-1 font-medium">
                Upload Photo (max 1MB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
              {photo && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {photo.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-violet-900 text-white rounded hover:bg-violet-800"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
