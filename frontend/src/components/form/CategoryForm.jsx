import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div className="mb-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center gap-4"
      >
        <input
          type="text"
          placeholder="Enter new category:"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className=" border border-gray-300 rounded px-4 py-2 w-full  md:w-1/2"
          required
        />
        <button
          type="submit"
          className="bg-violet-900 text-white px-6 py-2 rounded hover:bg-violet-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
