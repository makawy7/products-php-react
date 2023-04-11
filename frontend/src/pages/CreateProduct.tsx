import { Link } from "react-router-dom";
import { useState } from "react";
import { ProductFields } from "../types/ProductFields";
import {
  Book,
  Dvd,
  Furniture,
  Name,
  Price,
  Sku,
  Type,
} from "../components/form";
import Circle from "../components/Circle";

function CreateProduct() {
  const [type, setType] = useState("");
  const [Inputs, setInputs] = useState<ProductFields>({
    sku: "",
    name: "",
    price: "",
    type: "",
    weight: "",
    size: "",
    height: "",
    width: "",
    length: "",
  });

  // console.log(Inputs);
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
          <Sku setInputs={setInputs} {...Inputs} />
          <Name setInputs={setInputs} {...Inputs} />
          <Price setInputs={setInputs} {...Inputs} />
          <Type type={type} setType={setType} setInputs={setInputs} />
          {type === "dvd" && <Dvd setInputs={setInputs} {...Inputs} />}
          {type === "furniture" && (
            <Furniture setInputs={setInputs} {...Inputs} />
          )}
          {type === "book" && <Book setInputs={setInputs} {...Inputs} />}
        </div>
        <div className="mt-5 text-right">
          <span className="inline-flex rounded-md shadow-sm ">
            <button
              type="submit"
              className="inline-flex items-center justify-center py-2 px-4 border border-transparent leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-50"
            >
              <Circle />
              <span>Submit</span>
            </button>
          </span>
        </div>
      </div>
    </form>
  );
}

export default CreateProduct;
