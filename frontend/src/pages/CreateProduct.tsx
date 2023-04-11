import { Link } from "react-router-dom";
import { useState } from "react";
import { ProductFields } from "../types/ProductFields";
import { CreateProductErrors } from "../types/CreateProductErrors";
import { API_BASE_URL, ADD_PRODUCT } from "../constants/api";
import { validateProductInputs } from "../utils/validateProductInputs";
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
  const [errors, setErrors] = useState<CreateProductErrors>({
    sku: null,
    name: null,
    price: null,
    type: null,
    weight: null,
    size: null,
    height: null,
    width: null,
    length: null,
  });

  // console.log(Inputs);
  console.log(errors);
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateProductInputs(Inputs, setErrors)) {
      // submitProduct();
      console.log("submit");
    }
  };

  const submitProduct = async () => {
    const res = await fetch(API_BASE_URL + ADD_PRODUCT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Inputs),
    });
    const data = await res.json();
    console.log(data);
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
          <Sku setInputs={setInputs} {...Inputs} errors={errors} />
          <Name setInputs={setInputs} {...Inputs} errors={errors} />
          <Price setInputs={setInputs} {...Inputs} errors={errors} />
          <Type
            type={type}
            setType={setType}
            setInputs={setInputs}
            errors={errors}
          />
          {type === "dvd" && (
            <Dvd setInputs={setInputs} {...Inputs} errors={errors} />
          )}
          {type === "furniture" && (
            <Furniture setInputs={setInputs} {...Inputs} errors={errors} />
          )}
          {type === "book" && (
            <Book setInputs={setInputs} {...Inputs} errors={errors} />
          )}
        </div>
        <div className="mt-5 text-right">
          <span className="inline-flex rounded-md shadow-sm ">
            <button
              onClick={handleSubmit}
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
