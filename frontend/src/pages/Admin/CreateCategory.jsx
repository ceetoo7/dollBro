import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Dialog } from "@headlessui/react";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // 🔹 Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log("Fetch Category Error:", error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // 🔹 Create new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        toast.success(`${data?.category?.name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data?.message || "Failed to create category");
      }
    } catch (error) {
      console.log("Create Category Error:", error);
      toast.error("Something went wrong in input form");
    }
  };

  // 🔹 Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while updating category");
    }
  };

  // 🔹 Delete category
  const handleDelete = async (id) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Category deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <Layout title={"Create Category"}>
      <div className="flex flex-col md:flex-row">
        <div>
          <AdminMenu />
        </div>
        <div className="p-4 w-full">
          <h1 className="text-xl font-semibold mb-4">Manage Categories</h1>

          {/* 🔹 Category Form */}
          <div className="p-3 bg-white rounded shadow mb-5">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>

          {/* 🔹 List of Categories */}
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-violet-900 text-white">
                <tr>
                  <th className="text-left px-6 py-2 border-b w-[50%]">Name</th>
                  <th className="text-left px-6 py-2 border-b w-[50%]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c._id}>
                    <td className="border-b px-6 py-3">{c.name}</td>
                    <td className="border-b px-6 py-3">
                      <button
                        className="mr-1 px-2 py-1 bg-violet-900 text-white rounded-sm"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="ml-1 px-2 py-1 bg-red-700 text-white rounded-sm"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔹 Update Modal using HeadlessUI */}
          <Dialog open={visible} onClose={() => setVisible(false)}>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/30" />

            {/* Modal Content */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <Dialog.Title className="text-lg font-semibold mb-4">
                  Update Category
                </Dialog.Title>

                <form onSubmit={handleUpdate} className="space-y-4">
                  {/* Controlled Input */}
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    placeholder="Enter updated name"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setVisible(false)}
                      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-violet-800 text-white hover:bg-violet-800"
                    >
                      OK
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
