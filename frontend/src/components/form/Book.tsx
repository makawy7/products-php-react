import { Dispatch, SetStateAction, ChangeEvent, useState } from "react";
import { ProductFields } from "../../types/ProductFields";
import { CreateProductErrors } from "../../types/CreateProductErrors";

export default function Book({
  setInputs,
  weight,
  errors,
}: {
  setInputs: Dispatch<SetStateAction<ProductFields>>;
  weight: string;
  errors: CreateProductErrors;
}) {
  const weightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: ProductFields) => ({
      ...prev,
      weight: e.target.value,
    }));
  };
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
      <label
        htmlFor="weight"
        className="block text-sm font-medium text-gray-700"
      >
        Weight (KG)
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <input
          onChange={weightChange}
          id="weight"
          value={weight ?? ""}
          className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
        />

        {errors.weight && (
          <div className="mt-1 text-xs text-red-600 ">{errors.weight}</div>
        )}
      </div>
    </div>
  );
}
