import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { ProductFields } from "../../types/ProductFields";
import { CreateProductErrors } from "../../types/CreateProductErrors";

export default function Price({
  setInputs,
  price,
  errors,
}: {
  setInputs: Dispatch<SetStateAction<ProductFields>>;
  price: string
  errors: CreateProductErrors;
}) {
  const priceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: ProductFields) => ({
      ...prev,
      price: e.target.value,
    }));
  };
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        Price
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <input
          onChange={priceChange}
          value={price ?? ""}
          id="price"
          className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
        />
        <div className="text-xs text-red-600 hidden">
          Please enter a valid Price.
        </div>
      </div>
    </div>
  );
}
