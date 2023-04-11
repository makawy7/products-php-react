import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import Book from "../components/form/Book";
import Furniture from "../components/form/Furniture";
import Dvd from "../components/form/Dvd";

function CreateProduct() {
  const [type, setType] = useState("");
  const typeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };
  return (
    <form action="#" method="POST">
      <div>
        <div className="flex flex-wrap items-center">
          <div className="w-full sm:w-1/2 text-left">
            <h1 className="text-2xl font-bold inline">Add Product</h1>
          </div>
          <div className="w-full sm:w-1/2 text-right">
            <Link
              to="/"
              className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out mr-2"
            >
              Back Home
            </Link>
          </div>
        </div>
        <div className="mt-6 sm:mt-5">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="sku"
              className="block text-sm font-medium text-gray-700"
            >
              SKU
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                id="sku"
                className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
              />
              <div className="mt-1 text-xs text-red-600 hidden">
                Please enter a valid SKU.
              </div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                id="name"
                className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
              />
              <div className="mt-1 text-xs text-red-600 hidden">
                Please enter a valid Name.
              </div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                id="price"
                className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
              />
              <div className="text-xs text-red-600 hidden">
                Please enter a valid Price.
              </div>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type:
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select
                onChange={typeChange}
                defaultValue={type}
                id="type"
                className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
              >
                <option value=""></option>
                <option value="dvd">DVD</option>
                <option value="furniture">Furniture</option>
                <option value="book">Book</option>
              </select>
            </div>
          </div>
          {type === "dvd" && <Dvd />}
          {type === "furniture" && <Furniture />}
          {type === "book" && <Book />}


        </div>
        <div className="mt-5 text-right">
            <span className="inline-flex rounded-md shadow-sm ">
              <button
                type="submit"
                className="inline-flex items-center justify-center py-2 px-4 border border-transparent leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-50"
              >
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Submit</span>
              </button>
            </span>
          </div>
      </div>
    </form>
  );
}

export default CreateProduct;
