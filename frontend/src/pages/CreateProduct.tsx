import { Link } from "react-router-dom";
import { useState, Dispatch, SetStateAction } from "react";
import { ProductFields } from "../types/ProductFields";
import ErrorBar from "../components/ErrorBar";
import { useNavigate } from "react-router-dom";
import { CreateProductErrors } from "../types/CreateProductErrors";
import { API_BASE_URL, ADD_PRODUCT } from "../constants/api";
import { defaultInputs } from "../constants/defaultInputs";
import { defaultInputErrors } from "../constants/defaultInputErrors";
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

function CreateProduct({
  setSubmitSuccess,
  setSuccessMessage,
}: {
  setSubmitSuccess: Dispatch<SetStateAction<boolean | null>>;
  setSuccessMessage: Dispatch<SetStateAction<string | null>>;
}) {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [Inputs, setInputs] = useState<ProductFields>(defaultInputs);
  const [errors, setErrors] = useState<CreateProductErrors>(defaultInputErrors);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<boolean | null>(null);
  const [errorMessge, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateProductInputs(Inputs, setErrors)) {
      submitProduct();
    }
  };

  const submitProduct = async () => {
    setLoading(true);
    const res = await fetch(API_BASE_URL + ADD_PRODUCT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Inputs),
    });
    const data = await res.json();
    if (res.status === 201) {
      setSubmitError(false);
      setSubmitSuccess(true);
      setSuccessMessage(data?.success);
      navigate("/");
    } else {
      setErrorMessage(data?.error);
      setSubmitError(true);
    }
    setLoading(false);
  };

  console.log(Inputs);
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
          {submitError && (
            <ErrorBar message={errorMessge} setSubmitError={setSubmitError} />
          )}
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
              {loading && <Circle />}
              <span>Submit</span>
            </button>
          </span>
        </div>
      </div>
    </form>
  );
}

export default CreateProduct;
