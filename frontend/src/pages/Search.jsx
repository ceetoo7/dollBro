import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useSearch } from "../context/search.jsx";

const Search = () => {
  const [values] = useSearch();

  console.log("Search values:", values); // Debug
  const results = Array.isArray(values?.results) ? values.results : [];

  return (
    <Layout title={"search results"}>
      <div>
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {results.length < 1
              ? "No Products Found"
              : `Found ${results.length}`}
          </h6>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {results.map((p) => (
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
                    {p.description?.substring(0, 30)}...
                  </p>
                  <p className="text-l  my-1 text-green-700 ">NRs {p.price}</p>
                  <div className="flex justify-end">
                    <button className="width-20 bg-violet-900 text-white mr-4 px-2 py-1 rounded-sm hover:bg-violet-700">
                      More...
                    </button>
                    <button className="width-20 bg-red-700 text-white px-2 py-1 rounded-sm hover:bg-red-600">
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
