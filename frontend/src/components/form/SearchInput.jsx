import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="hidden md:flex items-center space-x-2 ml-4"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          placeholder="search"
          aria-label="search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
        />
        <button
          className="bg-violet-200 px-3 py-1 rounded hover:bg-violet-300 focus:ring focus:ring-blue-300"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
