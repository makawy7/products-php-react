import { Link } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import {
  API_BASE_URL,
  GET_PRODUCTS,
  MASS_DELETE_PRODUCTS,
} from "../constants/api";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ProductType } from "../types/ProductType";
import SuccessBar from "../components/SuccessBar";
import ErrorBar from "../components/ErrorBar";

function ListProducts({
  setSubmitSuccess,
  setSuccessMessage,
  submitSuccess,
  sucessMessge,
}: {
  setSubmitSuccess: Dispatch<SetStateAction<boolean | null>>;
  setSuccessMessage: Dispatch<SetStateAction<string | null>>;
  submitSuccess: boolean | null;
  sucessMessge: string | null;
}) {
  const { data, loading, noProductsError, fetchData } = useFetch(
    API_BASE_URL + GET_PRODUCTS
  );
  const [checked, setChecked] = useState<Array<Number>>([]);
  const [checkedError, setCheckedError] = useState<boolean | null>(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    if (e.target.checked) {
      setChecked([...checked, id]);
    } else {
      setChecked(checked.filter((item) => item !== id));
    }
  };

  const deleteProducts = async () => {
    const res = await fetch(API_BASE_URL + MASS_DELETE_PRODUCTS, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: checked }),
    });
    const data = await res.json();
    if (res.status === 200) {
      setSubmitSuccess(true);
      setSuccessMessage(data?.success);
      setChecked([]);
      // refetch data
      fetchData();
    }
  };

  const submitDelete = () => {
    // check if there is at least one checked
    if (checked.length === 0) {
      setCheckedError(true);
    } else {
      // submit delete request
      deleteProducts();
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex flex-wrap items-center ">
        <div className="w-full sm:w-1/2 text-left">
          <h1 className="text-2xl font-bold inline">Product List</h1>
        </div>
        <div className="w-full sm:w-1/2 text-right">
          <Link
            to="/add-product"
            className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out mr-2"
          >
            ADD
          </Link>
          <button
            onClick={submitDelete}
            id="delete-product-btn"
            className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out mr-2"
          >
            MASS DELETE
          </button>
        </div>
      </div>
      {checkedError && (
        <ErrorBar
          message="Please select at least one product"
          setError={setCheckedError}
        />
      )}
      {submitSuccess && (
        <SuccessBar
          message={sucessMessge}
          setSubmitSuccess={setSubmitSuccess}
        />
      )}
      <form
        id="products"
        className="w-full flex flex-wrap py-4"
        action="./deleteproduct"
        method="post"
      >
        {noProductsError && (
          <div className="w-full text-center">
            <h1 className="text-2xl font-bold">No products found</h1>
          </div>
        )}
        {data.map((product: ProductType) => (
          <SingleProduct
            key={product.id}
            {...product}
            handleCheck={handleCheck}
          />
        ))}
      </form>
    </>
  );
}

export default ListProducts;
