import { Link } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import { API_BASE_URL, GET_PRODUCTS } from "../constants/api";

function ListProducts() {
  const { data, loading } = useFetch(API_BASE_URL + GET_PRODUCTS);

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
            id="delete-product-btn"
            className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out mr-2"
          >
            MASS DELETE
          </button>
        </div>
      </div>
      <form
        id="products"
        className="w-full flex flex-wrap py-4"
        action="./deleteproduct"
        method="post"
      >
        {data.map((product) => (
          <SingleProduct key={product.id} {...product} />
        ))}

        <small id="check_warning" className="text-red-600 hidden">
          Please choose at least one product to delete
        </small>
      </form>
    </>
  );
}

export default ListProducts;
