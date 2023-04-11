import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { ProductFields } from "../../types/ProductFields";
import { CreateProductErrors } from "../../types/CreateProductErrors";

export default function Furniture({
  setInputs,
  height,
  width,
  length,
  errors,
}: {
  setInputs: Dispatch<SetStateAction<ProductFields>>;
  height: string;
  width: string;
  length: string;
  errors: CreateProductErrors;
}) {
  const heightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: ProductFields) => ({
      ...prev,
      height: e.target.value,
    }));
  };
  const widthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: ProductFields) => ({
      ...prev,
      width: e.target.value,
    }));
  };
  const lengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: ProductFields) => ({
      ...prev,
      length: e.target.value,
    }));
  };
  return (
    <>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="height"
          className="block text-sm font-medium text-gray-700"
        >
          Height (CM)
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            onChange={heightChange}
            value={height ?? ""}
            id="height"
            className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
          />
          {errors.height && (
            <div className="mt-1 text-xs text-red-600 ">{errors.height}</div>
          )}
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="width"
          className="block text-sm font-medium text-gray-700"
        >
          Width (CM)
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            onChange={widthChange}
            value={width ?? ""}
            id="width"
            className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
          />
          {errors.width && (
            <div className="mt-1 text-xs text-red-600 ">{errors.width}</div>
          )}
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="length"
          className="block text-sm font-medium text-gray-700"
        >
          Length (CM)
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            onChange={lengthChange}
            value={length ?? ""}
            id="length"
            className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
          />
          {errors.length && (
            <div className="mt-1 text-xs text-red-600 ">{errors.length}</div>
          )}
        </div>
      </div>
    </>
  );
}
