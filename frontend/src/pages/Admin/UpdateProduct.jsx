import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState("");
  const [deleted, setDeleted] = useState(false);

  // Fetch product once on mount
  useEffect(() => {
    if (deleted) return; // skip if deleted

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/product/get-product/${params.slug}`
        );

        if (!data?.product) {
          toast.error("Product not found");
          return;
        }

        const p = data.product;
        setProductId(p._id);
        setName(p.name);
        setDescription(p.description);
        setPrice(p.price);
        setCategory(p.category?._id);
        setColor(p.color);
        setQuantity(p.quantity);
        setShipping(p.shipping);
        setPreview(
          `http://localhost:8080/api/v1/product/product-photo/${
            p._id
          }?${Date.now()}`
        );
      } catch (error) {
        console.error("Failed to load product", error);
        toast.error("Failed to load product");
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/category/get-category"
        );
        if (data?.success) {
          setCategories(data.category);
        }
      } catch (error) {
        console.error("Failed to load categories", error);
        toast.error("Failed to load categories");
      }
    };

    fetchProduct();
    fetchCategories();

    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [params.slug, deleted]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  //handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("color", color);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      if (photo) formData.append("photo", photo);

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error", error);
      toast.error("Something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      if (!productId) {
        toast.error("Invalid product ID");
        return;
      }

      const confirmDelete = window.confirm(
        "Are You Sure want to delete this product?"
      );
      if (!confirmDelete) return;

      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data?.success) {
        toast.success(data.message || "Product deleted successfully");
        navigate("/dashboard/admin/products");
        setDeleted(true);
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Update Product">
      <div className="flex flex-col md:flex-row">
        <div>
          <AdminMenu />
        </div>

        <div className="w-full p-4">
          <h1 className="text-xl font-semibold mb-4">Update Product</h1>

          <form className="space-y-4 bg-white p-4 rounded shadow m-auto w-[95%] md:w-[70%] lg:w-[60%]">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Product Name"
              required
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Description"
              required
            />

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Price"
              required
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Color"
              required
            />

            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Quantity"
              required
            />

            <select
              value={shipping ? "true" : "false"}
              onChange={(e) => setShipping(e.target.value === "true")}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="false">No Shipping</option>
              <option value="true">Shipping Available</option>
            </select>

            {preview && (
              <div className="mb-2">
                <img
                  src={preview}
                  alt="Product Preview"
                  className="h-48 w-full object-cover rounded"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full border px-3 py-2 rounded"
            />

            <button
              type="button"
              onClick={handleUpdate}
              className="px-6 py-2 bg-violet-900 text-white rounded hover:bg-violet-800"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="ml-4 px-6 py-2 bg-red-800 text-white rounded hover:bg-red-600"
            >
              Delete Product
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
