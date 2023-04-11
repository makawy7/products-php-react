import { Dispatch, ChangeEvent, SetStateAction } from "react";
import { ProductFields } from "../../types/ProductFields";
import { CreateProductErrors } from "../../types/CreateProductErrors";

export default function Type({
  type,
  setType,
  setInputs,
  errors,
}: {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  setInputs: Dispatch<SetStateAction<ProductFields>>;
  errors: CreateProductErrors;
}) {
  const typeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    setInputs((prev: ProductFields) => ({
      ...prev,
      type: e.target.value,
      weight: "",
      height: "",
      width: "",
      length: "",
      size: "",
    }));
  };
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
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
        {errors.type && (
          <div className="mt-1 text-xs text-red-600 ">{errors.type}</div>
        )}
      </div>
    </div>
  );
}
